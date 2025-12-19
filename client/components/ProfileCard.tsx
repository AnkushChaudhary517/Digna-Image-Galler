import { Button } from "@/components/ui/button";
import { UserPlus, UserMinus } from "lucide-react";

interface ProfileCardProps {
  id: string;
  name: string;
  username: string;
  profileImage: string;
  bio: string;
  uploads: number;
  isFollowing?: boolean;
  onFollowClick?: (profileId: string) => void;
}

export default function ProfileCard({
  id,
  name,
  username,
  profileImage,
  bio,
  uploads,
  isFollowing = false,
  onFollowClick,
}: ProfileCardProps) {
  return (
    <div className="flex flex-col items-center p-4 sm:p-6 rounded-lg sm:rounded-xl border border-border hover:shadow-md transition-shadow">
      {/* Profile Image */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mb-3 sm:mb-4 border-2 border-primary flex-shrink-0">
        <img
          src={profileImage}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name and Username */}
      <h3 className="text-base sm:text-lg font-semibold text-foreground text-center mb-1">{name}</h3>
      <p className="text-xs sm:text-sm text-muted-foreground mb-2">{username}</p>

      {/* Bio */}
      {bio && (
        <p className="text-xs sm:text-sm text-gray-600 text-center mb-2 sm:mb-3 line-clamp-2 px-2">
          {bio}
        </p>
      )}

      {/* Followers Count */}
      <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
        <span className="font-semibold text-foreground">{uploads} Uploads</span>
      </p>

      {/* Follow Button */}
      {onFollowClick && (
        <Button
          onClick={() => onFollowClick(id)}
          variant={isFollowing ? "outline" : "default"}
          size="sm"
          style={{
            fontFamily: "Sora, system-ui, sans-serif",
            fontSize: "15px",
            lineHeight: "20px",
            fontWeight: 500,
          }}
          className="w-full min-h-[44px] text-sm sm:text-base rounded-xl"
        >
          {isFollowing ? (
            <>
              <UserMinus size={16} className="mr-2" />
              Unfollow
            </>
          ) : (
            <>
              <UserPlus size={16} className="mr-2" />
              Follow
            </>
          )}
        </Button>
      )}
    </div>
  );
}
