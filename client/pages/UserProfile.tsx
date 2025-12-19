import { useState, useEffect } from "react";
import { X, Upload, UserPlus, UserMinus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { userProfileAPI } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useError } from "@/context/ErrorContext";
import ProfileCard from "@/components/ProfileCard";
import FollowerCard from "@/components/FollowerCard";
import UploadImageCard from "@/components/UploadImageCard";
import EditProfileModal from "@/components/EditProfileModel";
import { productHeaderSvgs } from "@/components/decorativeSvgs/productHeaderSvgs";
import { toast } from "sonner";

interface Stats {
  uploads: any;
  downloads: any;
  followers: any;
  following: any;
  stats: any;
}

export default function UserProfile() {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { showError } = useError();
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("uploads");
  const [showForm, setShowForm] = useState(false);

  const [showEditAndUpload, setShowEditAndUpload] = useState(true);

  const [profileUser, setProfileUser] = useState<any>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowingLoading, setIsFollowingLoading] = useState(false);

  useEffect(() => {
    loadStats();
  }, [profileId]);

  // Check if viewing another user's profile
  // Show follow button if profileId exists in URL and is different from current user's ID
  const isViewingOtherProfile = Boolean(
    profileId && 
    user?.userId && 
    profileId !== user.userId
  );

  const loadStats = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if(profileId) {
        setShowEditAndUpload(false);
      }else
      {
        setShowEditAndUpload(true);
      }
      const userProfile : any = await userProfileAPI.getProfile(profileId);
      if (userProfile && userProfile.success && userProfile.data) {
        setProfileUser(userProfile.data);
        // Check if current user is following this profile
        // This could be part of the profile data or stats
        if (userProfile.data.isFollowing !== undefined) {
          setIsFollowing(userProfile.data.isFollowing);
        }
      }
      const response: any = await userProfileAPI.getUserStats(profileId);
      if (response && response.success && response.data) {
        // Map the backend response to the expected frontend structure
        // Backend returns: { uploads: {count, items}, followers: [], followerCount: 0, following: [], followingCount: 0, isFollowing: false }
        const followersArray = Array.isArray(response.data.followers) 
          ? response.data.followers 
          : (response.data.followers?.items || []);
        
        // Handle following - similar to followers, it's an array
        const followingArray = Array.isArray(response.data.following) 
          ? response.data.following 
          : (response.data.following?.items || []);
        
        // Handle downloads - new format has 'recent' instead of 'items'
        const downloadsData = response.data.downloads || { count: 0, recent: [] };
        // Map downloads.recent to downloads.items format for component compatibility
        const downloadsItems = (downloadsData.recent || downloadsData.items || []).map((download: any) => {
          // Extract title from imageUrl if not provided
          let title = download.title;
          if (!title && download.imageUrl) {
            const urlParts = download.imageUrl.split('/');
            const fileName = urlParts[urlParts.length - 1];
            // Remove 'high_' or 'low_' or 'medium_' prefix if present
            title = fileName.replace(/^(high_|low_|medium_)/i, '') || 'Downloaded Image';
          }
          
          return {
            id: download.id || download.imageId,
            imageId: download.imageId,
            title: title || 'Downloaded Image',
            imageUrl: download.imageUrl,
            photographer: download.photographer,
            sizeId: download.sizeId,
            downloadedAt: download.createdAt || download.downloadedAt,
            createdAt: download.createdAt || download.downloadedAt,
          };
        });

        const statsData = {
          uploads: response.data.uploads || { count: 0, items: [] },
          // Convert downloads.recent to downloads.items format
          downloads: {
            count: downloadsData.count || 0,
            items: downloadsItems
          },
          // Convert followers array to object format
          followers: {
            count: response.data.followerCount ?? followersArray.length ?? 0,
            items: followersArray
          },
          // Convert following array to object format (similar to followers)
          following: {
            count: response.data.followingCount ?? followingArray.length ?? 0,
            items: followingArray
          },
          // Handle stats - calculate from available data
          stats: response.data.stats || {
            totalUploads: response.data.uploads?.count || 0,
            totalDownloads: downloadsData.count || 0,
            totalFollowers: response.data.followerCount ?? followersArray.length ?? 0,
            totalFollowing: response.data.followingCount ?? followingArray.length ?? 0,
            averageDownloadsPerImage: 0,
            mostPopularImage: null
          }
        };
        setStats(statsData);
        // Check if following status is in response
        if (response.data.isFollowing !== undefined) {
          setIsFollowing(response.data.isFollowing);
        }
      } else {
        // fallback to dummy if available
        const dummy = await (userProfileAPI as any).getUserStatsDummy?.();
        if (dummy && dummy.success && dummy.data) {
          setStats(dummy.data);
        } else {
          const errorMsg = "Failed to load profile stats";
          setError(errorMsg);
          showError(errorMsg, "Profile Error");
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load profile stats";
      setError(errorMessage);
      showError(err instanceof Error ? err : new Error(errorMessage), "Profile Error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowClick = async () => {
    if (!profileId || !isViewingOtherProfile) return;

    setIsFollowingLoading(true);
    try {
      const response: any = await userProfileAPI.followUser(profileId);
      if (response && response.success) {
        setIsFollowing(!isFollowing);
        toast.success(isFollowing ? "Unfollowed successfully" : "Following successfully");
        // Reload stats to update follower count
        await loadStats();
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

  if (!isAuthenticated || !user) {
    return (
      <>
        <Header
          decorativeSvg={productHeaderSvgs}
          heading=" "
          description=" "
          height="300px"
        />
        <div className="flex-1 flex items-center justify-center py-20" style={{ backgroundColor: "#FFFCF3" }}>
          <div className="text-center">
            <p className="text-xl font-semibold text-foreground mb-4">Please log in to view your profile</p>
            <Button 
              onClick={() => (window.location.href = "/")}
              style={{
                backgroundColor: "#2B21DA",
                color: "#FFFFFF",
                fontFamily: "Sora, system-ui, sans-serif",
                fontSize: "15px",
                lineHeight: "20px",
                fontWeight: 500,
              }}
              className="rounded-xl hover:bg-[#2319b5]"
            >
              Go to Home
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header decorativeSvg={productHeaderSvgs} heading=" " description=" " height="300px" />

      <main className="flex-1" style={{ backgroundColor: "#FFFCF3" }}>
        {/* Profile Header Section */}
        <div className="bg-gradient-to-r from-primary/10 to-orange-500/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6" style={{ top: "-30px", position: "relative" }}>
              {/* Profile Image */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-primary flex-shrink-0 mx-auto sm:mx-0" style={{ top: "-30px", position: "relative",borderColor:"white" }}>
                <img
                  src={((profileUser?.profileImage )?? user?.profileImage) || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"}
                  alt={profileUser?.firstName ?? user?.firstName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Profile Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between w-full gap-4">
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1" style={{ color: "black" }}>
                    {profileUser?.firstName ?? user?.firstName} {profileUser?.lastName ?? user?.lastName}
                  </h1>
                </div>

                {/* Action Buttons */}
                {showEditAndUpload && (
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto" style={{ padding: "0", position: "relative" }}>
                    <Button
                      onClick={() => navigate("/profile/update")}
                      style={{
                        backgroundColor: "#2B21DA",
                        color: "#FFFFFF",
                        border: "none",
                        fontFamily: "Sora, system-ui, sans-serif",
                        fontSize: "15px",
                        lineHeight: "20px",
                        fontWeight: 500,
                      }}
                      className="min-h-[44px] w-full sm:w-auto px-6 rounded-xl hover:bg-[#2319b5]"
                    >
                      Edit Profile
                    </Button>

                    {/* navigate to Upload Image page on click */}
                    <Button
                      onClick={() => navigate("/upload")}
                      style={{
                        backgroundColor: "#2B21DA",
                        color: "#FFFFFF",
                        fontFamily: "Sora, system-ui, sans-serif",
                        fontSize: "15px",
                        lineHeight: "20px",
                        fontWeight: 500,
                        border: "none",
                      }}
                      className="min-h-[44px] w-full sm:w-auto px-6 rounded-xl hover:bg-[#2319b5]"
                      aria-label="Open upload page"
                    >
                      <Upload size={16} className="mr-2" />
                      Upload
                    </Button>
                  </div>
                )}

                {/* Follow Button - Show when viewing another user's profile */}
                {isViewingOtherProfile && (
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto" style={{ padding: "0", position: "relative" }}>
                    <Button
                      onClick={handleFollowClick}
                      disabled={isFollowingLoading}
                      style={{
                        backgroundColor: isFollowing ? "#6B7280" : "#2B21DA",
                        color: "#FFFFFF",
                        border: "none",
                        fontFamily: "Sora, system-ui, sans-serif",
                        fontSize: "15px",
                        lineHeight: "20px",
                        fontWeight: 500,
                      }}
                      className="min-h-[44px] w-full sm:w-auto px-6 rounded-xl hover:bg-[#2319b5] disabled:opacity-50"
                    >
                      {isFollowingLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {isFollowing ? "Unfollowing..." : "Following..."}
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          {!isLoading && stats && stats.uploads && stats.downloads && stats.followers && stats.following && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* TabsList: use flex and gap */}
              <TabsList className="flex w-full flex-wrap gap-2 sm:gap-[10px] mb-4 sm:mb-6 md:mb-8">
                <TabsTrigger
                  value="uploads"
                  className="inline-flex items-center justify-center align-middle bg-[#DBDBDB00] text-[#0C1633] font-medium text-[16px] leading-[100%] tracking-[0%] select-none transition-all"
                >
                  <span className="hidden sm:inline">Uploads</span>
                  <span className="sm:hidden">Up</span>
                  <span className="ml-2 text-xs font-semibold px-2 py-1 rounded">
                    {stats.uploads?.count ?? 0}
                  </span>
                </TabsTrigger>

                <TabsTrigger
                  value="downloads"
                  className="inline-flex items-center justify-center align-middle bg-[#DBDBDB00] text-[#0C1633] font-medium text-[16px] leading-[100%] tracking-[0%] select-none transition-all"
                >
                  <span className="hidden sm:inline">Downloads</span>
                  <span className="sm:hidden">Down</span>
                  <span className="ml-2 text-xs font-semibold px-2 py-1 rounded">
                    {stats.downloads?.count ?? 0}
                  </span>
                </TabsTrigger>

                <TabsTrigger
                  value="followers"
                  className="inline-flex items-center justify-center align-middle bg-[#DBDBDB00] text-[#0C1633] font-medium text-[16px] leading-[100%] tracking-[0%] select-none transition-all hidden sm:flex"
                >
                  Followers
                  <span className="ml-2 text-xs font-semibold px-2 py-1 rounded">
                    {stats.followers?.count ?? 0}
                  </span>
                </TabsTrigger>

                <TabsTrigger
                  value="following"
                  className="inline-flex items-center justify-center align-middle bg-[#DBDBDB00] text-[#0C1633] font-medium text-[16px] leading-[100%] tracking-[0%] select-none transition-all hidden sm:flex"
                >
                  Following
                  <span className="ml-2 text-xs font-semibold px-2 py-1 rounded">
                    {stats.following?.count ?? 0}
                  </span>
                </TabsTrigger>

                <TabsTrigger
                  value="stats"
                  className="inline-flex items-center justify-center align-middle bg-[#DBDBDB00] text-[#0C1633] font-medium text-[16px] leading-[100%] tracking-[0%] select-none transition-all hidden sm:flex"
                >
                  Stats
                </TabsTrigger>
              </TabsList>

              {/* Add CSS overrides for selected state via inline <style> so Radix data-state attribute is targeted */}
              <style>{`
                /* Selected tab styles */
                [data-radix-tabs-trigger][data-state="active"] {
                  background: #2B21DA !important;
                  color: #ffffff !important;
                  width: 170px !important;
                  height: 50px !important;
                  opacity: 1 !important;
                  gap: 10px !important;
                  border-radius: 12px !important;
                  padding-left: 20px !important;
                  padding-right: 20px !important;
                  display: inline-flex;
                  align-items: center;
                  justify-content: center;
                }

                /* Ensure base triggers keep the requested typography */
                [data-radix-tabs-trigger] {
                  font-family: "Work Sans", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
                  font-weight: 500;
                  font-style: normal;
                  font-size: 16px;
                  line-height: 100%;
                  letter-spacing: 0%;
                  vertical-align: middle;
                }
              `}</style>

              {/* Uploads Tab */}
              <TabsContent value="uploads" className="mt-4 sm:mt-6 md:mt-8">
                {stats.uploads?.items && stats.uploads.items.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                    {stats.uploads.items.map((item: any) => (
                      <UploadImageCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        imageUrl={item.imageUrl}
                        downloads={item.downloads}
                        createdAt={item.createdAt}
                        liked={item.liked}  
                        isUpload={true}                   />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 sm:py-16 md:py-20">
                    <p className="text-muted-foreground" style={{
                      fontFamily: "Work Sans, system-ui, sans-serif",
                      fontSize: "clamp(14px, 1.6vw, 18px)",
                      lineHeight: "1.5",
                    }}>
                      No uploads yet. Start uploading your images!
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Downloads Tab */}
              <TabsContent value="downloads" className="mt-4 sm:mt-6 md:mt-8">
                {stats.downloads?.items && stats.downloads.items.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                    {stats.downloads.items.map((item: any) => (
                      <UploadImageCard
                        key={item.id || item.imageId}
                        id={item.imageId || item.id}
                        title={item.title || 'Downloaded Image'}
                        imageUrl={item.imageUrl}
                        photographer={item.photographer}
                        downloadedAt={item.downloadedAt || item.createdAt}
                        isUpload={false}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 sm:py-16 md:py-20">
                    <p className="text-muted-foreground" style={{
                      fontFamily: "Work Sans, system-ui, sans-serif",
                      fontSize: "clamp(14px, 1.6vw, 18px)",
                      lineHeight: "1.5",
                    }}>
                      No downloads yet. Start exploring and downloading images!
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Followers Tab */}
              <TabsContent value="followers" className="space-y-4 mt-4 sm:mt-6">
                {stats.followers?.items && stats.followers.items.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                    {stats.followers.items.map((follower: any) => (
                      <FollowerCard
                        key={follower.id}
                        id={follower.id}
                        name={follower.name || `${follower.firstName || ''} ${follower.lastName || ''}`.trim() || 'User'}
                        profileImage={follower.profileImage || follower.profile_image || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"}
                        uploads={follower.uploads || follower.uploadCount || 0}
                        backgroundImage={follower.backgroundImage}
                        isFollowing={follower.isFollowing || false}
                        onFollowChange={(profileId, newFollowingState) => {
                          // Update the follower's following state in the list if needed
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 sm:py-16 md:py-20">
                    <p className="text-muted-foreground" style={{
                      fontFamily: "Work Sans, system-ui, sans-serif",
                      fontSize: "clamp(14px, 1.6vw, 18px)",
                      lineHeight: "1.5",
                    }}>
                      No followers yet.
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Following Tab */}
              <TabsContent value="following" className="space-y-4 mt-4 sm:mt-6">
                {stats.following?.items && stats.following.items.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                    {stats.following.items.map((followee: any) => (
                    <FollowerCard
                      key={followee.id}
                      id={followee.id}
                      name={followee.name}
                      //username={followee.username}
                      profileImage={followee.profileImage}
                      //bio={followee.bio}
                      uploads={followee.uploads}
                      isFollowing={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 sm:py-16 md:py-20">
                    <p className="text-muted-foreground" style={{
                      fontFamily: "Work Sans, system-ui, sans-serif",
                      fontSize: "clamp(14px, 1.6vw, 18px)",
                      lineHeight: "1.5",
                    }}>
                      Not following anyone yet.
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Stats Tab */}
              <TabsContent value="stats" className="space-y-4 mt-4 sm:mt-6">
                {stats.stats ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                      <div className="p-4 sm:p-6 rounded-xl border border-border">
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">Total Uploads</p>
                        <p className="text-2xl sm:text-3xl font-bold text-foreground">
                          {stats.stats?.totalUploads ?? 0}
                        </p>
                      </div>
                      <div className="p-4 sm:p-6 rounded-xl border border-border">
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">Total Downloads</p>
                        <p className="text-2xl sm:text-3xl font-bold text-foreground">
                          {stats.stats?.totalDownloads ?? 0}
                        </p>
                      </div>
                      <div className="p-4 sm:p-6 rounded-xl border border-border">
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">Followers</p>
                        <p className="text-2xl sm:text-3xl font-bold text-foreground">
                          {stats.stats?.totalFollowers ?? 0}
                        </p>
                      </div>
                      <div className="p-4 sm:p-6 rounded-xl border border-border">
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">Following</p>
                        <p className="text-2xl sm:text-3xl font-bold text-foreground">
                          {stats.stats?.totalFollowing ?? 0}
                        </p>
                      </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
                      <div className="p-4 sm:p-6 rounded-xl border border-border">
                        <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                          Avg. Downloads per Image
                        </p>
                        <p className="text-xl sm:text-2xl font-bold text-foreground">
                          {stats.stats?.averageDownloadsPerImage ?? 0}
                        </p>
                      </div>
                      {stats.stats?.mostPopularImage && (
                        <div className="p-4 sm:p-6 rounded-xl border border-border">
                          <p className="text-xs sm:text-sm text-muted-foreground mb-2">Most Popular</p>
                          <p className="text-sm sm:text-base font-semibold text-foreground">
                            {stats.stats.mostPopularImage?.title ?? "N/A"}
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {stats.stats.mostPopularImage?.downloads ?? 0} downloads
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 sm:py-16 md:py-20">
                    <p className="text-muted-foreground">No stats available.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="p-8 text-center">
              <p className="text-red-600 mb-4">{error}</p>
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
                className="rounded-xl hover:bg-[#2319b5]"
              >
                Retry
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Edit Profile Modal */}
      <EditProfileModal
        open={isEditProfileOpen}
        onOpenChange={setIsEditProfileOpen}
      />
    </div>
  );
}
