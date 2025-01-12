import { useParams } from 'react-router-dom';
import { RESEARCH_REPORTS } from '@/pages/Research';
import { PropertyHero } from '@/components/PropertyHero';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export function ResearchPost() {
  const { id } = useParams();
  const report = RESEARCH_REPORTS.find(r => r.id === Number(id));

  if (!report) {
    return <div>Report not found</div>;
  }

  return (
    <div>
      <PropertyHero
        title={report.title}
        subtitle={report.description}
        imageUrl={report.imageUrl}
      />

      <motion.div 
        className="max-w-4xl mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-navy-800/50 rounded-lg border border-gold-500/20 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <FileText className="w-4 h-4" />
                <span>{report.date}</span>
                <span>{report.pages} pages</span>
              </div>
              <div className="flex gap-4">
                <Button className="bg-gold-500 text-navy-950 hover:bg-gold-600">
                  <Download className="w-4 h-4 mr-2" />
                  Download ({report.fileSize})
                </Button>
                <Button variant="outline" className="border-gold-500/20">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Stats
                </Button>
              </div>
            </div>

            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: report.content }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}