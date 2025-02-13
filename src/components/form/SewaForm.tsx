// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import InputField from "../InputField";
// import Image from "next/image";
// import { alatSchema, sewaSchema } from "@/lib/formValidationSchemas";
// import { useRouter } from "next/navigation";
// import { createAlat, createSewa, updateAlat } from "@/lib/actions";
// import { useFormState } from "react-dom";
// import { Dispatch, SetStateAction, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useUser } from '@clerk/clerk-react';


// const SewaForm = ({ type, data }: { type: "sewa"; data?: any }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<sewaSchema>({
//     resolver: zodResolver(sewaSchema),
//   });

//   const [state, formAction] = useFormState(
//     createSewa,  // Argument pertama: action
//     { success: false, error: false }      // Argument kedua: initialState
//   );
  
  
//   const { user } = useUser();
//   const usid = user?.username?.toString() || '';

//   const [isVisible, setIsVisible] = useState(true); // Kontrol modal internal
//   const router = useRouter();

//   const onSubmit = handleSubmit((data) => {
//     console.log(data);
//     formAction(data);
//   });

//   useEffect(() => {
//     if (state.success) {
//       toast(`Alat has been ${type === "sewa" ? "disewakan" : ""}!`);
//       setIsVisible(false); // Tutup modal setelah sukses
//       router.refresh();
//     }
//   }, [state, router, type]);

//   if (!isVisible) return null; // Tidak render apa-apa jika modal ditutup
  
//   return (
    
//     <form className="flex flex-col gap-8" onSubmit={onSubmit}>
//       <h1 className="text-xl font-semibold">{type} Alat</h1>
//       <span className="text-xs text-gray-400 font-medium">
//         Personal {usid} Information 
      
//       </span>
//       <button className="bg-blue-400 text-white p-2 rounded-md">
//         {type === "sewa"}
//       </button>
//     </form>
//   );
// };

// export default SewaForm;