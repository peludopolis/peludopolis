"use client";

import React, { useState, FormEvent, ChangeEvent, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { PostService } from "./service";
import Compressor from "compressorjs";
import { ImagePlus, PawPrint, Send, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostForm: React.FC = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      new Compressor(file, {
        quality: 0.6,
        success(compressedFile) {
          setImage(compressedFile as File);
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result as string);
          };
          reader.readAsDataURL(compressedFile);
        },
        error(err) {
          console.error("Error al comprimir la imagen:", err);
          toast.error("Error al procesar la imagen");
        },
      });
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Debes estar logueado para crear un post");
      return;
    }

    try {
      let imageString = null;
      if (image) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = async () => {
          imageString = reader.result as string;

          const postData = {
            description,
            image: imageString,
            userId: user?.user?.id?.toString() || "",
          };

          await PostService.createPost(postData);
          toast.success("¡Tu experiencia se ha creado con éxito! 🎉", {
            position: "top-right",
            autoClose: 2000,
          });
          setDescription("");
          setImage(null);
          setImagePreview(null);

          setTimeout(() => {
            router.push("/comunity");
          }, 2000);
        };
      } else {
        const postData = {
          description,
          userId: user?.user?.id?.toString() || "",
        };

        await PostService.createPost(postData);
        toast.success("¡Tu experiencia se ha creado con éxito! 🎉", {
          position: "top-right",
          autoClose: 2000,
        });
        setDescription("");

        setTimeout(() => {
          router.push("/comunity");
        }, 2000);
      }
    } catch (error) {
      console.error("Error creando post", error);
      toast.error("Hubo un error al crear el post");
    }
  };

  if (!user) {
    return (
      <div className="text-center p-6 bg-red-100 border border-red-400 text-red-700 rounded-md">
        <p>Debes estar logueado para compartir tu experiencia.</p>
        <p>
          Por favor,{" "}
          <Link href="/login" className="text-blue-600 underline">
            inicia sesión
          </Link>{" "}
          o{" "}
          <Link href="/register" className="text-blue-600 underline">
            regístrate
          </Link>.
        </p>
      </div>
    );
  }

  return (
    <div className="my-10 bg-gradient-to-br from-cyan-400 to-blue-500 p-6 rounded-2xl shadow-2xl max-w-xl mx-auto transform transition-all duration-300 hover:scale-[1.02]">
      <ToastContainer />
      <div className="flex items-center mb-6 space-x-3">
        <PawPrint className="text-white w-10 h-10" />
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Comparte tu experiencia
        </h2>
      </div>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe tu experiencia en el centro de estética de mascotas..."
        className="w-full p-4 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-300 min-h-[120px]"
        required
      />

      <div className="mt-4 flex items-center space-x-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="imageUpload"
        />
        <label
          htmlFor="imageUpload"
          className="flex items-center space-x-2 bg-white/30 text-white px-4 py-2 rounded-full hover:bg-white/40 transition cursor-pointer"
        >
          <ImagePlus className="w-5 h-5" />
          <span>Subir Imagen</span>
        </label>

        {imagePreview && (
          <div className="relative">
            <Image
              src={imagePreview}
              alt="Vista previa"
              className="w-24 h-24 object-cover rounded-xl shadow-lg border-2 border-white"
              width={96}
              height={96}
            />
            <button
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full mt-6 bg-white text-cyan-500 py-3 rounded-full font-bold text-lg hover:bg-white/90 transition flex items-center justify-center space-x-2 group"
      >
        <Send className="w-6 h-6 text-cyan-500 group-hover:translate-x-1 transition" />
        <span>Publicar Comentario</span>
      </button>
    </div>
  );
};

export default PostForm;





