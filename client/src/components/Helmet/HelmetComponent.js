import React, { memo } from "react";
// import { Helmet } from 'react-helmet'
import { Helmet, HelmetProvider } from "react-helmet-async";

const HelmetComponent = ({
  title,
  description,
  imageUrl,
  imageAlt,
  href,
  canonical,
}) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description?.substring(0, 150)} />
        <meta property="og:url" content={href} />
        <link rel="canonical" href={href}></link>
        <meta property="og:title" content={title?.length > 33 ? title?.substring(0, 33) + "..." : title} />
        <meta property="og:description" content={description?.substring(0, 150)} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:alt" content={imageAlt} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:url" content={imageUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={title} />
        <meta name="twitter:image:alt " content={imageAlt} />
        <meta property="twitter:image" content={imageUrl} />
        <meta property="twitter:description" content={description} />

        {/* <meta
      data-rh="true"
      name="description"
      content="AudioBay - nền tảng âm nhạc và âm thanh đa dạng, từ miễn phí đến bản quyền. Khám phá và tận hưởng những bản nhạc chất lượng cao, phù hợp với mọi nhu cầu sáng tạo nội dung của bạn."
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@AudioBay" />
    <meta name="twitter:creator" content="@AudioBay" />
    <meta
      name="twitter:title"
      content="AudioBay - Thư Viện Nhạc Miễn Phí Không Bản Quyền"
    />
    <meta
      data-rh="true"
      name="twitter:description"
      content="AudioBay - nền tảng âm nhạc và âm thanh đa dạng, từ miễn phí đến bản quyền. Khám phá và tận hưởng những bản nhạc chất lượng cao, phù hợp với mọi nhu cầu sáng tạo nội dung của bạn."
    />
    <meta
      data-rh="true"
      name="twitter:image"
      content="/assets/images/logo.png"
    />
    <meta property="og:url" content="https://audiobay.net" />
    <meta
      data-rh="true"
      property="og:image"
      content="https://audiobay.net/assets/images/logo.png"
    />
    <meta
      data-rh="true"
      property="og:description"
      content="AudioBay - nền tảng âm nhạc và âm thanh đa dạng, từ miễn phí đến bản quyền. Khám phá và tận hưởng những bản nhạc chất lượng cao, phù hợp với mọi nhu cầu sáng tạo nội dung của bạn."
    /> */}
      </Helmet>
    </HelmetProvider>
  );
};

export default memo(HelmetComponent);
