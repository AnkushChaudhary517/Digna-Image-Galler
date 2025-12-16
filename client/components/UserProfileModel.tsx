import { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { userProfileAPI } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import ProfileCard from "./ProfileCard";
import UploadImageCard from "./UploadImageCard";
import EditProfileModal from "./EditProfileModel";

interface UserProfileModalProps {
  isOpen: boolean;
  profileId?: string;
  onClose: () => void;
}

interface Stats {
  uploads: any;
  downloads: any;
  followers: any;
  following: any;
  stats: any;
}

export default function UserProfileModal({ isOpen, onClose, profileId }: UserProfileModalProps) {
  const { user } = useAuth();
  const [profileUser, setProfileUser] = useState<any>(null); 
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("uploads");

  useEffect(() => {
    if (isOpen) {
      loadProfile();
      loadStats();
    }
  }, [isOpen]);

    const loadProfile = async () => {
    try {
      // 🔥 If profileId is passed → fetch that user's profile
      if (profileId) {
        const res: any = await userProfileAPI.getProfile(profileId);
        if (res.success) {
          setProfileUser(res.data);
        }
      } else {
        // Otherwise use logged-in user
        setProfileUser(user);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadStats = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response:any = await userProfileAPI.getUserStats(profileId);
      if (response.success && response.data) {
        setStats(response.data);
      } else {
        setError("Failed to load profile stats");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load profile stats");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !user) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 pb-4 overflow-y-auto">
        <div
          className="w-full max-w-4xl bg-background rounded-2xl shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-primary/10 to-orange-500/10 p-8 border-b border-border">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X size={24} />
            </button>

            {/* Profile Section */}
            <div className="flex items-start gap-6">
              {/* Profile Image */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary flex-shrink-0">
                <img
                  src={user.profileImage || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"}
                  alt={user.firstName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-1">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-muted-foreground mb-4">@{user.email?.split("@")[0]}</p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => setIsEditProfileOpen(true)}
                    variant="default"
                    size="sm"
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-orange-600 hover:bg-orange-700 text-white border-0"
                  >
                    <Upload size={16} className="mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          {!isLoading && stats && (
            <div className="p-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-8">
                  <TabsTrigger value="uploads" className="text-sm">
                    Uploads
                    <span className="ml-2 text-xs font-semibold bg-primary/20 px-2 py-1 rounded">
                      {stats.uploads.count}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="downloads" className="text-sm">
                    Downloads
                    <span className="ml-2 text-xs font-semibold bg-primary/20 px-2 py-1 rounded">
                      {stats.downloads.count}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="followers" className="text-sm">
                    Followers
                    <span className="ml-2 text-xs font-semibold bg-primary/20 px-2 py-1 rounded">
                      {stats.followers.count}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="following" className="text-sm">
                    Following
                    <span className="ml-2 text-xs font-semibold bg-primary/20 px-2 py-1 rounded">
                      {stats.following.count}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="stats" className="text-sm">
                    Stats
                  </TabsTrigger>
                </TabsList>

                {/* Uploads Tab */}
                <TabsContent value="uploads" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stats.uploads.items.map((item: any) => (
                      console.log("stats",item),
                      <UploadImageCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        imageUrl={item.imageUrl}
                        downloads={item.downloads}
                        createdAt={item.createdAt}
                        isUpload={true}
                        liked = {item.liked}
                      />
                    ))}
                  </div>
                </TabsContent>

                {/* Downloads Tab */}
                <TabsContent value="downloads" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stats.downloads.items.map((item: any) => (
                      <UploadImageCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        imageUrl={item.imageUrl}
                        photographer={item.photographer}
                        downloadedAt={item.downloadedAt}
                        isUpload={false}
                      />
                    ))}
                  </div>
                </TabsContent>

                {/* Followers Tab */}
                <TabsContent value="followers" className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {stats.followers.items.map((follower: any) => (
                      <ProfileCard
                        key={follower.id}
                        id={follower.id}
                        name={follower.name}
                        username={follower.username}
                        profileImage={follower.profileImage}
                        bio={follower.bio}
                        followers={follower.followers}
                        isFollowing={true}
                      />
                    ))}
                  </div>
                </TabsContent>

                {/* Following Tab */}
                <TabsContent value="following" className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {stats.following.items.map((followee: any) => (
                      <ProfileCard
                        key={followee.id}
                        id={followee.id}
                        name={followee.name}
                        username={followee.username}
                        profileImage={followee.profileImage}
                        bio={followee.bio}
                        followers={followee.followers}
                        isFollowing={true}
                      />
                    ))}
                  </div>
                </TabsContent>

                {/* Stats Tab */}
                <TabsContent value="stats" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-6 rounded-xl border border-border ">
                      <p className="text-sm text-muted-foreground mb-2">Total Uploads</p>
                      <p className="text-3xl font-bold text-foreground">
                        {stats.stats.totalUploads}
                      </p>
                    </div>
                    <div className="p-6 rounded-xl border border-border ">
                      <p className="text-sm text-muted-foreground mb-2">Total Downloads</p>
                      <p className="text-3xl font-bold text-foreground">
                        {stats.stats.totalDownloads}
                      </p>
                    </div>
                    <div className="p-6 rounded-xl border border-border ">
                      <p className="text-sm text-muted-foreground mb-2">Followers</p>
                      <p className="text-3xl font-bold text-foreground">
                        {stats.stats.totalFollowers}
                      </p>
                    </div>
                    <div className="p-6 rounded-xl border border-border ">
                      <p className="text-sm text-muted-foreground mb-2">Following</p>
                      <p className="text-3xl font-bold text-foreground">
                        {stats.stats.totalFollowing}
                      </p>
                    </div>
                  </div>

                  {/* Additional Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div className="p-6 rounded-xl border border-border ">
                      <p className="text-sm text-muted-foreground mb-2">
                        Avg. Downloads per Image
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {stats.stats.averageDownloadsPerImage}
                      </p>
                    </div>
                    <div className="p-6 rounded-xl border border-border ">
                      <p className="text-sm text-muted-foreground mb-2">Most Popular</p>
                      <p className="font-semibold text-foreground">
                        {stats.stats.mostPopularImage.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {stats.stats.mostPopularImage.downloads} downloads
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="p-8 text-center">
              <p className="text-red-600">{error}</p>
              <Button 
                onClick={loadStats} 
                style={{
                  backgroundColor: "#2B21DA",
                  color: "#FFFFFF",
                  fontFamily: "Sora, system-ui, sans-serif",
                  fontSize: "15px",
                  lineHeight: "20px",
                  fontWeight: 500,
                }}
                className="mt-4 rounded-xl hover:bg-[#2319b5]"
              >
                Retry
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
      />
    </>
  );
}
