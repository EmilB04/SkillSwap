import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "@/app/components/SearchBar";

describe("SearchBar", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render search input", () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText("Search for skills, services, or people...")).toBeInTheDocument();
  });

  it("should update input value when typing", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search for skills, services, or people...") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Test" } });

    expect(input.value).toBe("Test");
  });

  it("should navigate to explore page with query on submit", () => {
    const mockAssign = vi.fn();
    delete (window as any).location;
    window.location = { href: "" } as any;
    Object.defineProperty(window.location, "href", {
      set: mockAssign,
      get: () => mockAssign.mock.lastCall?.[0] || ""
    });

    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search for skills, services, or people...") as HTMLInputElement;
    const form = input.closest("form")!;

    fireEvent.change(input, { target: { value: "TestValue" } });
    fireEvent.submit(form);

    expect(mockAssign).toHaveBeenCalledWith("/explore?q=TestValue");
  });

  it("should not navigate when query is empty", () => {
    const mockAssign = vi.fn();
    delete (window as any).location;
    window.location = { href: "" } as any;
    Object.defineProperty(window.location, "href", {
      set: mockAssign,
      get: () => mockAssign.mock.lastCall?.[0] || ""
    });

    const { container } = render(<SearchBar />);
    const form = container.querySelector("form")!;

    fireEvent.submit(form);

    expect(mockAssign).not.toHaveBeenCalled();
  });

  it("should not navigate when query is only whitespace", () => {
    const mockAssign = vi.fn();
    delete (window as any).location;
    window.location = { href: "" } as any;
    Object.defineProperty(window.location, "href", {
      set: mockAssign,
      get: () => mockAssign.mock.lastCall?.[0] || ""
    });

    const { container } = render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search for skills, services, or people...") as HTMLInputElement;
    const form = container.querySelector("form")!;

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.submit(form);

    expect(mockAssign).not.toHaveBeenCalled();
  });
});
