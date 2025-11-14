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
