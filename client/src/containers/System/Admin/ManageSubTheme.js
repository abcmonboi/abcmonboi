import React, { useState, useEffect, useCallback,useRef } from "react";
import {
  CreateSubThemeToThemeComponent,
  DetailsThemeComponent,
  TableSubThemeByThemeComponent,
} from "../../../components";
import { useParams } from "react-router-dom";
import { apiGetTheme, apiGetAllSubTheme } from "../../../apis";

const ManageSubTheme = () => {
  const { tid } = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [theme, setTheme] = useState();
  const [subTheme, setSubTheme] = useState();
  const [isLoadingSubTheme, setisLoadingSubTheme] = useState(true);
  const [totalThemeSub, setTotalThemeSub] = useState();
  const [showUploadSubTheme, setShowUploadSubTheme] = useState(false);
  const mangeSubThemeRef = useRef(null);
  const FetchGetTheme = async () => {
    const response = await apiGetTheme(tid);
    const data = response.data.data;
    setTotalThemeSub(response?.data?.countThemesub);
    setTheme(data);
    setisLoading(false);
  };
  const FetchSubThemeByTheme = async () => {
    const response = await apiGetAllSubTheme({
      themes: tid,
      limit: 30,
      sort: "-updatedAt",
    });
    const data = response?.data?.data;
    setSubTheme(data);
    setisLoadingSubTheme(false);
  };

  const handleUploadSubTheme = useCallback(
    (value) => {
      setShowUploadSubTheme(value);
    },
    [showUploadSubTheme]
  );
  const handleLoading = useCallback(
    (value) => {
      setisLoading(value);
    },
    [isLoading]
  );
  const handleLoadingSubTheme = useCallback(
    (value) => {
      setisLoadingSubTheme(value);
    },
    [isLoadingSubTheme]
  );
  useEffect(() => {
    if (!showUploadSubTheme && isLoading && isLoadingSubTheme) {
      FetchGetTheme();
      FetchSubThemeByTheme();
      mangeSubThemeRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isLoading]);
  return (
    <div 
    ref={mangeSubThemeRef}
    id="content-page " className="content-page ">
      <div className="container-fluid ">
        <DetailsThemeComponent
          handleUploadSubTheme={handleUploadSubTheme}
          theme={theme}
          totalThemeSub={totalThemeSub}
          isLoading={isLoading}
        />
        {showUploadSubTheme ? (
          <CreateSubThemeToThemeComponent
            theme={theme}
            handleUploadSubTheme={handleUploadSubTheme}
            handleLoading={handleLoading}
            handleLoadingSubTheme={handleLoadingSubTheme}
          />

        ) : (
          <TableSubThemeByThemeComponent
            title={theme?.title}
            subTheme={subTheme}
            isLoadingSubTheme={isLoadingSubTheme}
            handleLoading={handleLoading}
            handleLoadingSubTheme={handleLoadingSubTheme}
          />
        )}
      </div>
    </div>
  );
};

export default ManageSubTheme;
