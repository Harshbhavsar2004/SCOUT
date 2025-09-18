import { redirect } from "next/navigation"
import { clerkClient, currentUser } from "@clerk/nextjs/server"
import { SearchUsers } from "./SearchUsers"
import { removeRole, setRole } from "./_action"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Shield, GraduationCap, BookOpen, UserX } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import { SidebarDemo } from "./sidebar"

export default async function AdminDashboard({ searchParams }) {
  const user = await currentUser()
  if (!user || user.publicMetadata.role !== "admin") {
    redirect("/")
  }

  const query = searchParams?.search
  const client = await clerkClient()
  const users = query ? (await client.users.getUserList({ query })).data : []
  const topUsers = !query ? (await client.users.getUserList({ limit: 10 })).data : []

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />
      case "teacher":
        return <GraduationCap className="h-4 w-4" />
      case "student":
        return <BookOpen className="h-4 w-4" />
      case "co-ordinator":
        return <Users className="h-4 w-4" />
      default:
        return <UserX className="h-4 w-4" />
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "teacher":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "student":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "co-ordinator":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <SidebarDemo>
      <div className="flex-1 overflow-y-auto bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="mt-2 text-muted-foreground">
                  Manage user roles and permissions for your educational platform
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="px-3 py-1">
                  <Shield className="h-3 w-3 mr-1" />
                  Admin Access
                </Badge>
                <UserButton/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SearchUsers />
          </CardContent>
        </Card>

        {/* Users Grid */}
        {users.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <Card key={user.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={user.imageUrl || "/placeholder.svg"}
                          alt={`${user.firstName} ${user.lastName}`}
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user.firstName?.[0]}
                          {user.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-foreground truncate">
                          {user.firstName} {user.lastName}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {user.emailAddresses.find(
                            (email) => email.id === user.primaryEmailAddressId
                          )?.emailAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Badge
                      variant="secondary"
                      className={`${getRoleColor(user.publicMetadata.role || "none")} flex items-center gap-1 w-fit`}
                    >
                      {getRoleIcon(user.publicMetadata.role || "none")}
                      {user.publicMetadata.role || "No Role"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground mb-3">Assign Role:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <form action={setRole}>
                        <input type="hidden" value={query || ""} name="search" />
                        <input type="hidden" value={user.id} name="id" />
                        <input type="hidden" value="admin" name="role" />
                        <Button
                          type="submit"
                          variant="outline"
                          size="sm"
                          className="w-full text-xs hover:bg-red-50 hover:text-red-700 hover:border-red-200 bg-transparent"
                        >
                          <Shield className="h-3 w-3 mr-1" />
                          Admin
                        </Button>
                      </form>

                      <form action={setRole}>
                        <input type="hidden" value={query || ""} name="search" />
                        <input type="hidden" value={user.id} name="id" />
                        <input type="hidden" value="teacher" name="role" />
                        <Button
                          type="submit"
                          variant="outline"
                          size="sm"
                          className="w-full text-xs hover:bg-green-50 hover:text-green-700 hover:border-green-200 bg-transparent"
                        >
                          <GraduationCap className="h-3 w-3 mr-1" />
                          Teacher
                        </Button>
                      </form>

                      <form action={setRole}>
                        <input type="hidden" value={query || ""} name="search" />
                        <input type="hidden" value={user.id} name="id" />
                        <input type="hidden" value="student" name="role" />
                        <Button
                          type="submit"
                          variant="outline"
                          size="sm"
                          className="w-full text-xs hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 bg-transparent"
                        >
                          <BookOpen className="h-3 w-3 mr-1" />
                          Student
                        </Button>
                      </form>

                      <form action={setRole}>
                        <input type="hidden" value={query || ""} name="search" />
                        <input type="hidden" value={user.id} name="id" />
                        <input type="hidden" value="co-ordinator" name="role" />
                        <Button
                          type="submit"
                          variant="outline"
                          size="sm"
                          className="w-full text-xs hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 bg-transparent"
                        >
                          <Users className="h-3 w-3 mr-1" />
                          Coordinator
                        </Button>
                      </form>
                    </div>

                    <form action={removeRole} className="mt-3">
                      <input type="hidden" value={query || ""} name="search" />
                      <input type="hidden" value={user.id} name="id" />
                      <Button type="submit" variant="destructive" size="sm" className="w-full text-xs">
                        <UserX className="h-3 w-3 mr-1" />
                        Remove Role
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : query ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No users found</h3>
              <p className="text-muted-foreground">Try adjusting your search query to find users.</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Top 10 Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                {topUsers.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {topUsers.map((user) => (
                      <Card key={user.id} className="hover:shadow-lg transition-shadow duration-200">
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-12 w-12">
                                <AvatarImage
                                  src={user.imageUrl || "/placeholder.svg"}
                                  alt={`${user.firstName} ${user.lastName}`}
                                />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                  {user.firstName?.[0]}
                                  {user.lastName?.[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-foreground truncate">
                                  {user.firstName} {user.lastName}
                                </h3>
                                <p className="text-sm text-muted-foreground truncate">
                                  {user.emailAddresses.find(
                                    (email) => email.id === user.primaryEmailAddressId
                                  )?.emailAddress}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <Badge
                              variant="secondary"
                              className={`${getRoleColor(user.publicMetadata.role || "none")} flex items-center gap-1 w-fit`}
                            >
                              {getRoleIcon(user.publicMetadata.role || "none")}
                              {user.publicMetadata.role || "No Role"}
                            </Badge>
                          </div>
                        </CardHeader>

                        <CardContent className="pt-0">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-foreground mb-3">Assign Role:</p>
                            <div className="grid grid-cols-2 gap-2">
                              <form action={setRole}>
                                <input type="hidden" value={''} name="search" />
                                <input type="hidden" value={user.id} name="id" />
                                <input type="hidden" value="admin" name="role" />
                                <Button
                                  type="submit"
                                  variant="outline"
                                  size="sm"
                                  className="w-full text-xs hover:bg-red-50 hover:text-red-700 hover:border-red-200 bg-transparent"
                                >
                                  <Shield className="h-3 w-3 mr-1" />
                                  Admin
                                </Button>
                              </form>

                              <form action={setRole}>
                                <input type="hidden" value={''} name="search" />
                                <input type="hidden" value={user.id} name="id" />
                                <input type="hidden" value="teacher" name="role" />
                                <Button
                                  type="submit"
                                  variant="outline"
                                  size="sm"
                                  className="w-full text-xs hover:bg-green-50 hover:text-green-700 hover:border-green-200 bg-transparent"
                                >
                                  <GraduationCap className="h-3 w-3 mr-1" />
                                  Teacher
                                </Button>
                              </form>

                              <form action={setRole}>
                                <input type="hidden" value={''} name="search" />
                                <input type="hidden" value={user.id} name="id" />
                                <input type="hidden" value="student" name="role" />
                                <Button
                                  type="submit"
                                  variant="outline"
                                  size="sm"
                                  className="w-full text-xs hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 bg-transparent"
                                >
                                  <BookOpen className="h-3 w-3 mr-1" />
                                  Student
                                </Button>
                              </form>

                              <form action={setRole}>
                                <input type="hidden" value={''} name="search" />
                                <input type="hidden" value={user.id} name="id" />
                                <input type="hidden" value="co-ordinator" name="role" />
                                <Button
                                  type="submit"
                                  variant="outline"
                                  size="sm"
                                  className="w-full text-xs hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 bg-transparent"
                                >
                                  <Users className="h-3 w-3 mr-1" />
                                  Coordinator
                                </Button>
                              </form>
                            </div>

                            <form action={removeRole} className="mt-3">
                              <input type="hidden" value={''} name="search" />
                              <input type="hidden" value={user.id} name="id" />
                              <Button type="submit" variant="destructive" size="sm" className="w-full text-xs">
                                <UserX className="h-3 w-3 mr-1" />
                                Remove Role
                              </Button>
                            </form>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-muted-foreground">No users available</div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
    </SidebarDemo>
  )
}
