import axios from "../axiosConfig";

export const getSong = () => {
    return new Promise((resolve, reject) => {
        axios
            .get("/api/song/?limit=6")
            .then((res) => {
                // console.log(res.data);
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    }
    );
};
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        axios
            .get("/api/user/current")
            .then((res) => {
                
                resolve(res);
            })
            .catch((err) => {
                
                reject(err);
            });
    }
    );
};

export const getNewRelease = (sort) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/song/?sort=${sort}&limit=9&status=true`)
            .then((res) => {
             
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    }
    );
};

