import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPayload } from 'payload';
import config from '../cms/payload.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to convert Lexical richText to plain text
const lexicalToPlainText = (lexicalData: any): string => {
  if (!lexicalData || !lexicalData.root) return '';
  
  const extractText = (node: any): string => {
    if (node.type === 'text') return node.text || '';
    if (node.children) {
      return node.children.map(extractText).join('');
    }
    return '';
  };
  
  return lexicalData.root.children?.map(extractText).join('\n') || '';
};

const exportData = async () => {
  const timeout = setTimeout(() => {
    console.error('Export timed out after 30 seconds');
    process.exit(1);
  }, 30000);

  try {
    console.log('Initializing Payload...');
    const payload = await getPayload({ config });
    
    const dataDir = path.join(__dirname, '../src/data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    console.log('Fetching About data...');
    const aboutData = await payload.findGlobal({
      slug: 'about',
    });

    // Transform the data for Vue app consumption
    const transformedData = {
      bio: lexicalToPlainText(aboutData.bio),
      socialLinks: aboutData.socialLinks || [],
      experiences: (aboutData.experiences || []).map((exp: any) => ({
        company: exp.company,
        position: exp.position,
        startDate: exp.startDate,
        endDate: exp.endDate,
        responsibilities: lexicalToPlainText(exp.responsibilities),
      })),
      skills: aboutData.skills || [],
    };

    fs.writeFileSync(
      path.join(dataDir, 'about.json'),
      JSON.stringify(transformedData, null, 2)
    );
    console.log('✓ About data exported');

    // Export Portfolio data
    console.log('Fetching Portfolio data...');
    const portfolioData = await payload.find({
      collection: 'portfolio',
      limit: 100,
    });

    // Create media directory in public folder
    const mediaDir = path.join(__dirname, '../public/media');
    if (!fs.existsSync(mediaDir)) {
      fs.mkdirSync(mediaDir, { recursive: true });
    }

    // Helper to copy media file and return public path
    const copyMediaFile = (url: string | null): string | null => {
      if (!url) return null;

      // Extract filename from URL (e.g., /api/media/file/image.png -> image.png)
      const filename = url.split('/').pop();
      if (!filename) return null;

      // Source path in CMS uploads
      const sourcePath = path.join(__dirname, '../cms/media', decodeURIComponent(filename));
      const destPath = path.join(mediaDir, decodeURIComponent(filename));

      try {
        if (fs.existsSync(sourcePath)) {
          fs.copyFileSync(sourcePath, destPath);
          console.log(`  ✓ Copied: ${filename}`);
          return `/media/${filename}`;
        } else {
          console.warn(`  ⚠ File not found: ${sourcePath}`);
          return null;
        }
      } catch (error) {
        console.error(`  ✗ Error copying ${filename}:`, error);
        return null;
      }
    };

    const transformedPortfolio = portfolioData.docs.map((item: any) => {
      const mainImageUrl = typeof item.mainImage === 'object' ? item.mainImage?.url : item.mainImage;

      return {
        id: item.id,
        title: item.title,
        slug: item.slug,
        description: item.description,
        content: lexicalToPlainText(item.content),
        mainImage: copyMediaFile(mainImageUrl),
        galleryImages: (item.galleryImages || []).map((img: any) => {
          const imgUrl = typeof img.image === 'object' ? img.image?.url : img.image;
          return copyMediaFile(imgUrl);
        }).filter(Boolean),
        technologies: (item.technologies || []).map((t: any) => t.tech),
        highlights: (item.highlights || []).map((h: any) => h.achievement),
        liveUrl: item.liveUrl,
        githubUrl: item.githubUrl,
      };
    });

    fs.writeFileSync(
      path.join(dataDir, 'portfolio.json'),
      JSON.stringify(transformedPortfolio, null, 2)
    );
    console.log('✓ Portfolio data exported');

    console.log('✓ Export complete!');
    clearTimeout(timeout);
    process.exit(0);
  } catch (error) {
    console.error('Error exporting data:', error);
    clearTimeout(timeout);
    process.exit(1);
  }
};

exportData();
