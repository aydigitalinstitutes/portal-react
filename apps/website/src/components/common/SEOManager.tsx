import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import api from "../../lib/axios";

interface SeoItem {
  key: string;
  subtitle: string;
}

export default function SEOManager() {
  const [seoData, setSeoData] = useState<SeoItem[]>([]);

  useEffect(() => {
    const fetchSeo = async () => {
      try {
        const res = await api.get("/website-content/items?section=seo");
        if (res.data && Array.isArray(res.data)) {
          setSeoData(res.data);
        } else if (res.data && res.data.data && Array.isArray(res.data.data)) {
           // Handle wrapped response
           setSeoData(res.data.data);
        }
      } catch (e) {
        console.error("Failed to fetch SEO data", e);
      }
    };
    fetchSeo();
  }, []);

  const getSeoValue = (key: string) => {
    return seoData.find((item) => item.key === key)?.subtitle || "";
  };

  const title = getSeoValue("meta_title") || "AY Digital Institute";
  const description = getSeoValue("meta_description") || "Computer Training Center";
  const keywords = getSeoValue("meta_keywords") || "computer, course, training";
  const ogImage = getSeoValue("og_image") || "";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
    </Helmet>
  );
}
