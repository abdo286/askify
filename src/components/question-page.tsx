import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"

export function QuestionPage() {
  return (
    <Card className="p-4 bg-white dark:bg-gray-900 rounded-lg">
      <CardHeader className="flex justify-between gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">What are the best practices for optimizing images on the web?</h2>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid gap-4">
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
            <div className="grid gap-4">
              <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                <Textarea
                  className="border border-gray-200 dark:border-gray-800 p-2 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600"
                  placeholder="Add your comment..."
                />
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg ml-auto">
                  <Button
                    className="bg-gray-800 text-gray-100 dark:bg-gray-700 dark:text-gray-200"
                    size="sm"
                    variant="outline"
                  >
                    Comment
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">Anonymous</div>
                  <div className="text-gray-500 text-xs dark:text-gray-400">5 months ago</div>
                  <div>
                    I really love the ecosystem Vercel is creating. The way each component can be added and modified
                    with ease really makes these tools attractive.
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">Anonymous</div>
                  <div className="text-gray-500 text-xs dark:text-gray-400">2 months ago</div>
                  <div>
                    We are more than excited to leverage all the new stuff, building better products for our clients ✨
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">Anonymous</div>
                  <div className="text-gray-500 text-xs dark:text-gray-400">6 days ago</div>
                  <div>does anyone know which monospace are they using when showing code?</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
