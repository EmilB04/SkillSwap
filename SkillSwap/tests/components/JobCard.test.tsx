import { render, screen, fireEvent } from "@testing-library/react";
import JobCard from "@/app/components/JobCard";
import { createMockJob } from "../helpers/mockData";

describe("JobCard", () => {
  const mockJob = createMockJob();

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
      const image = screen.getByAltText("Test Job Title opportunity");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "/test-image.jpg");
    });

    it("should render View Details button", () => {
      render(<JobCard job={mockJob} />);
      expect(
        screen.getByRole("button", { name: /view details/i })
      ).toBeInTheDocument();
    });
  });
  describe("Date Formatting", () => {
    it("should format date correctly in DD MMM YYYY format", () => {
      const job = createMockJob({ date: new Date(2025, 9, 22) }); // October 22, 2025
      render(<JobCard job={job} />);
      expect(screen.getByText(/22.*Oct.*2025/i)).toBeInTheDocument();
    });

    it("should handle single digit dates correctly", () => {
      const job = createMockJob({ date: new Date(2025, 0, 5) }); // January 5, 2025
      render(<JobCard job={job} />);
      expect(screen.getByText(/05.*Jan.*2025/i)).toBeInTheDocument();
    });
  });

  describe("Navigation", () => {
    it("should render link to job details page with correct slug", () => {
      render(<JobCard job={mockJob} />);
      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/job/test-category-1");
    });

    it("should use custom slug when provided", () => {
      const customJob = createMockJob({ slug: "custom-slug-123" });
      render(<JobCard job={customJob} />);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/job/custom-slug-123");
    });

    it("should have View Details button inside the card", () => {
      render(<JobCard job={mockJob} />);
      const button = screen.getByRole("button", { name: /view details/i });
      expect(button).toBeInTheDocument();
    });
  });
});
