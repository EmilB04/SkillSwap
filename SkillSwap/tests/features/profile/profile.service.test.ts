import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  createProfileService,
  type ProfileService,
} from "@/features/profile/profile.service";
import type { ProfileRepository } from "@/features/profile/profile.repository";
import { createMockProfile } from "../../helpers/authMockData";

describe("ProfileService", () => {
  let profileService: ProfileService;
  let mockRepository: ProfileRepository;

  beforeEach(() => {
    // Create mock repository
    mockRepository = {
      findByUserId: vi.fn(),
      upsert: vi.fn(),
    };

    // Create profile service with mocked repository
    profileService = createProfileService(mockRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("get", () => {
    it("should successfully retrieve profile by user ID", async () => {
      const mockProfile = createMockProfile({ userId: 1 });

      vi.mocked(mockRepository.findByUserId).mockResolvedValue({
        success: true,
        data: mockProfile,
      });

      const result = await profileService.get(1);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.userId).toBe(1);
        expect(result.data.displayName).toBe("Test User");
      }
      expect(mockRepository.findByUserId).toHaveBeenCalledWith(1);
    });

    it("should return error when profile not found", async () => {
      vi.mocked(mockRepository.findByUserId).mockResolvedValue({
        success: false,
        error: { code: 404, message: "Profile details not found" },
      });

      const result = await profileService.get(999);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.code).toBe(404);
      }
    });
  });

  describe("update", () => {
    it("should successfully update own profile", async () => {
      const updatedProfile = createMockProfile({
        userId: 1,
        displayName: "New Name",
        bio: "New bio",
      });

      vi.mocked(mockRepository.upsert).mockResolvedValue({
        success: true,
        data: updatedProfile,
      });

      const result = await profileService.update(
        1,
        { displayName: "New Name", bio: "New bio" },
        1
      );

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.displayName).toBe("New Name");
        expect(result.data.bio).toBe("New bio");
      }
    });

    it("should reject update when user tries to update another user's profile", async () => {
      const result = await profileService.update(
        2,
        { displayName: "Unauthorized Change" },
        1
      );

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.code).toBe(403);
      }
      expect(mockRepository.upsert).not.toHaveBeenCalled();
    });
  });
});
