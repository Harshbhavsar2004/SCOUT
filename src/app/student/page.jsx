"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, Search, BookOpen, Trophy, TrendingUp, Filter, Bell } from "lucide-react"

// Mock data for exams
const upcomingExams = [
  {
    id: 1,
    subject: "Advanced Mathematics",
    date: "2025-01-20",
    time: "10:00 AM",
    duration: "3 hours",
    type: "Final Exam",
    status: "scheduled",
  },
  {
    id: 2,
    subject: "Computer Science Fundamentals",
    date: "2025-01-22",
    time: "2:00 PM",
    duration: "2.5 hours",
    type: "Midterm",
    status: "scheduled",
  },
  {
    id: 3,
    subject: "Physics Laboratory",
    date: "2025-01-25",
    time: "9:00 AM",
    duration: "4 hours",
    type: "Practical Exam",
    status: "scheduled",
  },
  {
    id: 4,
    subject: "English Literature",
    date: "2025-01-28",
    time: "11:00 AM",
    duration: "2 hours",
    type: "Essay Exam",
    status: "scheduled",
  },
]

const completedExams = [
  {
    id: 5,
    subject: "Database Management",
    date: "2024-12-15",
    time: "1:00 PM",
    duration: "2 hours",
    type: "Final Exam",
    status: "completed",
    score: 92,
    grade: "A",
  },
  {
    id: 6,
    subject: "Web Development",
    date: "2024-12-10",
    time: "3:00 PM",
    duration: "3 hours",
    type: "Project Defense",
    status: "completed",
    score: 88,
    grade: "A-",
  },
  {
    id: 7,
    subject: "Statistics",
    date: "2024-12-05",
    time: "10:00 AM",
    duration: "2.5 hours",
    type: "Midterm",
    status: "completed",
    score: 85,
    grade: "B+",
  },
  {
    id: 8,
    subject: "Data Structures",
    date: "2024-11-28",
    time: "2:00 PM",
    duration: "2 hours",
    type: "Final Exam",
    status: "completed",
    score: 95,
    grade: "A+",
  },
]

export default function ExamDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("upcoming")

  const filteredUpcoming = upcomingExams.filter((exam) => exam.subject.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredCompleted = completedExams.filter((exam) =>
    exam.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const averageScore = completedExams.reduce((acc, exam) => acc + exam.score, 0) / completedExams.length

  return (
    <div className="bg-white">

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{upcomingExams.length}</div>
              <p className="text-xs text-muted-foreground">Next exam in 5 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Exams</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{completedExams.length}</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{averageScore.toFixed(1)}%</div>
              <Progress value={averageScore} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">12 days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-fit grid-cols-3">
              <TabsTrigger value="upcoming">Upcoming Exams</TabsTrigger>
              <TabsTrigger value="completed">Completed Exams</TabsTrigger>
              <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
            </TabsList>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid gap-4">
              {filteredUpcoming.map((exam) => (
                <Card key={exam.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{exam.subject}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(exam.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {exam.time} ({exam.duration})
                          </span>
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-2">
                          {exam.type}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          {Math.ceil((new Date(exam.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}{" "}
                          days left
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button className="flex-1">View Details</Button>
                      <Button variant="outline">Study Materials</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="grid gap-4">
              {filteredCompleted.map((exam) => (
                <Card key={exam.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{exam.subject}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(exam.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {exam.time}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{exam.type}</Badge>
                          <Badge
                            variant={exam.score >= 90 ? "default" : exam.score >= 80 ? "secondary" : "outline"}
                            className="font-bold"
                          >
                            {exam.grade}
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold text-primary">{exam.score}%</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        View Results
                      </Button>
                      <Button variant="outline">Download Certificate</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Your exam performance trends and statistics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-1">A-</div>
                      <div className="text-sm text-muted-foreground">Average Grade</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-1">90%</div>
                      <div className="text-sm text-muted-foreground">Highest Score</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-1">4/4</div>
                      <div className="text-sm text-muted-foreground">Exams Passed</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Subject Performance</h4>
                    <div className="space-y-3">
                      {completedExams.map((exam) => (
                        <div key={exam.id} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{exam.subject}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={exam.score} className="w-24" />
                            <span className="text-sm font-medium w-12 text-right">{exam.score}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Study Recommendations</CardTitle>
                  <CardDescription>Personalized suggestions based on your performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Focus on Mathematics</div>
                        <div className="text-sm text-muted-foreground">
                          Your upcoming Advanced Mathematics exam is in 5 days. Consider reviewing calculus concepts.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                      <BookOpen className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <div className="font-medium">Maintain Strong Performance</div>
                        <div className="text-sm text-muted-foreground">
                          You're doing great! Keep up the consistent study schedule for optimal results.
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
