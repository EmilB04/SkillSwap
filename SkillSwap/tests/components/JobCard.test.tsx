import { render, screen, fireEvent } from "@testing-library/react";
import JobCard from "@/app/components/JobCard";
import { createMockJob } from "../helpers/mockData";

describe("JobCard", () => {
  const mockJob = createMockJob();
  const mockOnRequestJob = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render job title", () => {
      render(<JobCard job={mockJob} />);
      expect(screen.getByText("Test Job Title")).toBeInTheDocument();
    });

    it("should render job description", () => {
      render(<JobCard job={mockJob} />);
      expect(screen.getByText("Test job description")).toBeInTheDocument();
    });

    it("should render category", () => {
      render(<JobCard job={mockJob} category="Test Category" />);
      expect(screen.getByText("Test Category")).toBeInTheDocument();
    });

    it("should render payment information", () => {
      render(<JobCard job={mockJob} payment="$25/hour" />);
      expect(screen.getByText("$25/hour")).toBeInTheDocument();
    });

    it("should render image with correct src and alt text", () => {
      render(<JobCard job={mockJob} imageUrl="/test-image.jpg" />);
      const image = screen.getByAltText("Test Job Title job");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "/test-image.jpg");
    });

    it("should render Request Job button", () => {
      render(<JobCard job={mockJob} />);
      expect(
        screen.getByRole("button", { name: /request job/i })
      ).toBeInTheDocument();
    });
  });
  describe("Date Formatting", () => {
    it("should format date correctly in DD.MM.YY format", () => {
      const job = createMockJob({ date: new Date(2025, 9, 22) }); // October 22, 2025
      render(<JobCard job={job} />);
      expect(screen.getByText("22.10.25")).toBeInTheDocument();
    });

    it("should handle single digit dates correctly", () => {
      const job = createMockJob({ date: new Date(2025, 0, 5) }); // January 5, 2025
      render(<JobCard job={job} />);
      expect(screen.getByText("05.01.25")).toBeInTheDocument();
    });
  });

  describe("Button Interaction", () => {
    it("should call onRequestJob with correct job ID when button is clicked", () => {
      render(<JobCard job={mockJob} onRequestJob={mockOnRequestJob} />);

      const button = screen.getByRole("button", { name: /request job/i });
      fireEvent.click(button);

      expect(mockOnRequestJob).toHaveBeenCalledTimes(1);
      expect(mockOnRequestJob).toHaveBeenCalledWith(1);
    });

    it("should not throw error when onRequestJob is not provided", () => {
      render(<JobCard job={mockJob} />);

      const button = screen.getByRole("button", { name: /request job/i });

      expect(() => fireEvent.click(button)).not.toThrow();
    });
  });
});
