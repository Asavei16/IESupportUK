import { useI18n } from "@/lib/i18n";
import { BlogPost } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const { language, t } = useI18n();
  const title = language === "en" ? post.title : post.titleRo;
  const content = language === "en" ? post.content : post.contentRo;
  // const formattedDate = format(new Date(post.createdAt), "MMMM d, yyyy");
  const formattedDate =
  post.date && !isNaN(new Date(post.date).getTime())
    ? format(new Date(post.date), "MMMM d, yyyy")
    : "N/A";


  return (
    <Card className="h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-6 flex-grow">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{formattedDate}</span>
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-700 line-clamp-3">{content}</p>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/blog/${post.id}`}>{t("blog.readMore")}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
