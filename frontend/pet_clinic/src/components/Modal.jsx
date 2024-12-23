import { Button, Input, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify"; 
import axios from "axios";

export const Modal = ({ isOpen, onClose, userId, formData, handleInputChange, handleFileChange }) => {
  if (!isOpen) return null;

  const token = localStorage.getItem("access_token");
  if (!token) {
    toast.error("Token bulunamadı, lütfen tekrar giriş yapın.",{
      position: "top-center",
      autoClose: 2000,}
    );
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('first_name', formData.firstName);
    formDataToSend.append('last_name', formData.lastName);
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone_number', formData.phone_number);

    // Sadece dosya yüklendiyse ekle
    if (formData.profile_picture instanceof File) {
      formDataToSend.append('profile_picture', formData.profile_picture);
    }

    console.log("FormData to be sent:", Array.from(formDataToSend.entries()));

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/users/users/${userId}/`,
        formDataToSend,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        toast.success('Profil başarıyla güncellendi!',{
          position: "top-center",
          autoClose: 2000,});
        onClose();
      }
    } catch (error) {
      console.error('Bir hata oluştu:', error);
      const errorMessage = error.response?.data?.detail || 'Bir hata oluştu. Lütfen tekrar deneyin.';
      toast.error(errorMessage ,{
        position: "top-center",
        autoClose: 2000,});
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5" color="black">Bilgileri Güncelle</Typography>
          <button onClick={onClose} className="text-gray-500">
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="İsim"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <Input
              label="Soyisim"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <Input
              label="Kullanıcı Adı"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <Input
              label="E-posta"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input
              label="Telefon Numarası"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Profil Resmi</label>
              <input
                type="file"
                id="image"
                name="profile_picture"
                onChange={handleFileChange}
                className="mt-2 block w-full text-sm text-gray-500 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <Button type="button" onClick={onClose} color="gray">Vazgeç</Button>
              <Button type="submit" color="green">Güncelle</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
