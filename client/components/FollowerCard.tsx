import { Button } from "@/components/ui/button";
import { UserPlus, UserMinus } from "lucide-react";
import { useError } from "@/context/ErrorContext";
import { userProfileAPI } from "@/services/api";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface FollowerCardProps {
  id: string;
  name: string;
  profileImage: string;
  uploads: number;
  backgroundImage?: string;
  isFollowing?: boolean;
  onFollowClick?: (profileId: string) => void;
  onFollowChange?: (profileId: string, isFollowing: boolean) => void;
  className?: string;
}

export default function FollowerCard({
  id,
  name,
  profileImage,
  uploads,
  backgroundImage,
  isFollowing: initialIsFollowing = false,
  onFollowClick,
  onFollowChange,
  className = "",
}: FollowerCardProps) {
  const { showError } = useError();
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isFollowingLoading, setIsFollowingLoading] = useState(false);

  const handleFollowClick = async () => {
    if (isFollowingLoading) return;

    setIsFollowingLoading(true);
    try {
      // Call the follow API
      const response: any = await userProfileAPI.followUser(id);
      
      if (response && response.success) {
        const newFollowingState = !isFollowing;
        setIsFollowing(newFollowingState);
        toast.success(newFollowingState ? "Following successfully" : "Unfollowed successfully");
        
        // Call optional callback
        if (onFollowClick) {
          onFollowClick(id);
        }
        if (onFollowChange) {
          onFollowChange(id, newFollowingState);
        }
      } else {
        showError(
          new Error(response?.error?.message || "Failed to follow user"),
          "Follow Error"
        );
      }
    } catch (err) {
      showError(
        err instanceof Error ? err : new Error("Failed to follow user"),
        "Follow Error"
      );
    } finally {
      setIsFollowingLoading(false);
    }
  };

  // Update isFollowing state when prop changes
  useEffect(() => {
    setIsFollowing(initialIsFollowing);
  }, [initialIsFollowing]);

  // Default background image - sunset landscape
  const defaultBackground = backgroundImage || 
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop";

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow ${className}`}
      style={{
        maxWidth: "100%",
        width: "100%",
      }}
    >
      {/* Background Image Section */}
      <div
        className="relative w-full"
        style={{
          height: "180px",
          backgroundImage: `url(${defaultBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Profile Picture - Overlaid and extending into white space */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{
            bottom: "-50px",
            width: "100px",
            height: "100px",
            zIndex: 10,
          }}
        >
          <div
            className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg"
            style={{
              backgroundColor: "#fff",
            }}
          >
            <img
              src={profileImage || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=default";
              }}
            />
          </div>
        </div>
      </div>

      {/* Content Section - White background */}
      <div
        className="pt-16 pb-4 px-4 text-center"
        style={{
          paddingTop: "70px", // Space for profile picture
        }}
      >
        {/* Name */}
        <h3
          className="mb-2"
          style={{
            color: "#1F2937",
            fontFamily: "Sora, system-ui, sans-serif",
            fontWeight: 600,
            fontStyle: "normal",
            fontSize: "20px",
            lineHeight: "100%",
            letterSpacing: "0%",
            verticalAlign: "middle",
          }}
        >
          {name}
        </h3>

        {/* Upload Count */}
        <div className="mb-4">
          <span
            style={{
              color: "#2B21DA",
              fontFamily: "Work Sans, system-ui, sans-serif",
              fontWeight: 500,
              fontStyle: "normal",
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textAlign: "center",
              verticalAlign: "middle",
            }}
          >
            {uploads.toLocaleString()} Uploads
          </span>
        </div>

        {/* Follow Button */}
        <div className="w-full mt-2">
          <Button
            onClick={handleFollowClick}
            disabled={isFollowingLoading}
            variant="default"
            className="w-full min-h-[44px] rounded-xl"
            style={{
              backgroundColor: isFollowing ? "#6B7280" : "#2B21DA",
              color: "#FFFFFF",
              fontFamily: "Sora, system-ui, sans-serif",
              fontSize: "15px",
              lineHeight: "20px",
              fontWeight: 500,
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              visibility: "visible",
              opacity: isFollowingLoading ? 0.7 : 1,
            }}
          >
            {isFollowingLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {isFollowing ? "Unfollowing..." : "Following..."}
              </>
            ) : isFollowing ? (
              <>
                <UserMinus size={16} className="mr-2" />
                Following
              </>
            ) : (
              <>
                <UserPlus size={16} className="mr-2" />
                Follow
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

