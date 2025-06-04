import { useI18n } from "@/lib/i18n";
import { University } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Clock, PoundSterling } from "lucide-react";

interface UniversityCardProps {
  university: University;
}

const UniversityCard = ({ university }: UniversityCardProps) => {
  const { language, t } = useI18n();
  const description = language === "en" ? university.description : university.descriptionRo;

  return (
    <Card className="h-full flex flex-col">
      {/* <div className="relative h-48 overflow-hidden">
        {/* <img
          src={university.image}
          alt={university.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        /> */}
        {/* {university.ranking && (
          <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-md text-sm font-medium">
            #{university.ranking} UK
          </div>
        )} }
      </div> */}
      <CardContent className="p-6 flex-grow">
        <h3 className="text-xl font-semibold mb-1">{university.name}</h3>
        <p className="text-gray-500 text-sm mb-3">{university.location}</p>
        <div className="flex items-center mb-2">
            <Clock className="h-4 w-4 mr-2" />
            <p className="text-gray-700 line-clamp-4">{description}</p>
        </div>
         <div className="flex items-center">
            <PoundSterling className="h-4 w-4 mr-2" />
            <p className="text-gray-700 line-clamp-4">{university.tuition}</p>
        </div>
      </CardContent>
      {/* <CardFooter className="px-6 pb-6 pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/courses/${university.id}`}>{t("universities.viewPrograms")}</Link>
        </Button>
      </CardFooter> */}
    </Card>
  );
};

export default UniversityCard;
