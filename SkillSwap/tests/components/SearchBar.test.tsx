import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "@/app/components/SearchBar";

describe("SearchBar", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render search input", () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("should update input value when typing", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Test" } });

    expect(input.value).toBe("Test");
  });

  it("should navigate to explore page with query on submit", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
    const form = input.closest("form")!;

    const mockLink = { href: "", click: vi.fn() };
    vi.spyOn(document, "createElement").mockReturnValue(mockLink as any);

    fireEvent.change(input, { target: { value: "TestValue" } });
    fireEvent.submit(form);

    expect(mockLink.href).toBe("/explore?q=TestValue");
    expect(mockLink.click).toHaveBeenCalled();
  });

  it("should not submit when query is empty", () => {
    const { container } = render(<SearchBar />);
    const form = container.querySelector("form")!;

    const mockLink = { href: "", click: vi.fn() };
    vi.spyOn(document, "createElement").mockReturnValue(mockLink as any);

    fireEvent.submit(form);

    expect(mockLink.click).not.toHaveBeenCalled();
  });
});
