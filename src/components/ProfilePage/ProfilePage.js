import styles from "./ProfilePage.module.css";
import Header from "../Header/Header";
import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import Alert from "@material-ui/lab/Alert";
import { func, storage } from "../../constants/Firebase";

const ProfilePage = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const { currentUser } = useContext(AuthContext);
  const uploadRef = useRef();

  const handleChange = (e) => {
    setError("");

    if (e.target.files[0]) {
      const filename = e.target.files[0].name;
      if (
        (filename.substring(filename.lastIndexOf(".") + 1, filename.length) ||
          filename) !== "png"
      ) {
        setError("You can only upload a png file");
      } else {
        setImage(e.target.files[0]);
      }
    }
  };

  const updateProfileImageUrl = func.httpsCallable("updateProfileImageUrl");

  const handleUpload = async () => {
    setError("");
    if (image === null) {
      setError("Please upload a valid image");
      return false;
    }

    const profileRef = storage.ref(`users/${currentUser.uid}/profilePic.png`);
    try {
      await profileRef.put(image);
      const downloadUrl = await profileRef.getDownloadURL();
      await updateProfileImageUrl({ Url: downloadUrl });
      setImage(null);
      uploadRef.current.value = "";
    } catch (err) {
      setError(err.message);
    }
  };

  const getProfileImagebyId = func.httpsCallable("getProfileImagebyId");

  const getProfileImage = async () => {
    setError("");
    try {
      setImageUrl((await getProfileImagebyId({ id: currentUser.uid })).data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getProfileImage();
  }, [image]);

  return (
    <div>
      <Header />
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Profile</h1>
      </div>
      <section>
        <div className={styles.sectionContent}>
          <div className={styles.imgContainer}>
            <img
              src={imageUrl}
              alt="profile"
              width="100%"
              height="inherit"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.uploadButtonContainer}>
            <input
              type="file"
              onChange={handleChange}
              ref={uploadRef}
              className={styles.chooseFile}
            />
            <button className={styles.uploadButton} onClick={handleUpload}>
              Upload new image
            </button>
          </div>
          <div className={styles.noticeTextContainer}>
            <p>Note: Only pngs are accepted.</p>
          </div>
          {error && <Alert severity="error">{error}</Alert>}
          <div className={styles.emailContainer}>
            <strong>Email: </strong>
            {currentUser.email}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
