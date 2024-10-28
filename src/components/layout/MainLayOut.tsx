import React from "react";
import bgImage from "@/img/backgrounds/1920x1080-main-bg.webp";
import Avatar from "@/components/layout/Sidebar/Avatar";
import Header from "@/components/layout/Header/Header";

const MainLayOut = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      {/* Loader Start */}
      <div id="loader" className="loader loaded">
        <div id="loaderContent" className="loader__content fade-out">
          <div className="loader__shadow" />
          <div className="loader__box" />
        </div>
      </div>
      {/* Loader End */}
      <Header />
      {/* Image Background Layer Start */}
      <div
        id="imageBackground"
        className="image-background"
        data-speed="0.4"
        style={{
          translate: "none",
          rotate: "none",
          scale: "none",
          transform: "translate(0px, 0px)",
          // transform: "translate3d(0px, 4972.8px, 0px)",
          backgroundImage: `url(${bgImage.src})`,
        }}
      />
      {/* Image Background Layer End */}
      <Avatar />
      {/* Page Content Start */}
      <div id="content" className="content">
        {children}
      </div>
      {/* Page Content End */}
      {/* Root element of PhotoSwipe. Must have class pswp. */}
      <div className="pswp" tabIndex={-1} role="dialog" aria-hidden="true">
        {/* Background of PhotoSwipe.
It's a separate element, as animating opacity is faster than rgba(). */}
        <div className="pswp__bg" />
        {/* Slides wrapper with overflow:hidden. */}
        <div className="pswp__scroll-wrap">
          {/* Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. */}
          {/* don't modify these 3 pswp__item elements, data is added later on. */}
          <div className="pswp__container">
            <div className="pswp__item" />
            <div className="pswp__item" />
            <div className="pswp__item" />
          </div>
          {/* Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. */}
          <div className="pswp__ui pswp__ui--hidden">
            <div className="pswp__top-bar">
              {/*  Controls are self-explanatory. Order can be changed. */}
              <div className="pswp__counter" />
              <button
                className="pswp__button pswp__button--close link-s"
                title="Close (Esc)"
              />
              <button
                className="pswp__button pswp__button--share link-s"
                title="Share"
              />
              <button
                className="pswp__button pswp__button--fs link-s"
                title="Toggle fullscreen"
              />
              <button
                className="pswp__button pswp__button--zoom link-s"
                title="Zoom in/out"
              />
              {/* Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR */}
              {/* element will get class pswp__preloader-active when preloader is running */}
              <div className="pswp__preloader">
                <div className="pswp__preloader__icn">
                  <div className="pswp__preloader__cut">
                    <div className="pswp__preloader__donut" />
                  </div>
                </div>
              </div>
            </div>
            <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div className="pswp__share-tooltip" />
            </div>
            <button
              className="pswp__button pswp__button--arrow--left link-s"
              title="Previous (arrow left)"
            />
            <button
              className="pswp__button pswp__button--arrow--right link-s"
              title="Next (arrow right)"
            />
            <div className="pswp__caption">
              <div className="pswp__caption__center" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayOut;
