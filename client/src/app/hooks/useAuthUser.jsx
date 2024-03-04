
import CryptoJS from 'crypto-js';
import { cookies } from 'next/headers'
import axios from 'axios';


export default async function useAuthUser() {
  const cookieStore = cookies()
  const key = 'rar'


  const getEncryptedCookie = cookieStore.get("user") || null

  if (getEncryptedCookie === null || getEncryptedCookie == undefined){
    return false
  }

  const parseEncryptedCookie = CryptoJS.AES.decrypt(getEncryptedCookie.value, key).toString(CryptoJS.enc.Utf8) 
  const jsonDecrypt = JSON.parse(parseEncryptedCookie)

  if (jsonDecrypt.validationKey === "token") {
    let constructResponse;
    if (jsonDecrypt?.username) {
      constructResponse = {
        "username": jsonDecrypt?.username,
        "password": jsonDecrypt?.password
      }
    } else {
      constructResponse = {
        "email": jsonDecrypt?.email,
        "password": jsonDecrypt?.password
      }
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed
          },
          body: JSON.stringify(constructResponse),
        });

        if (response.ok) {
          // HTTP status in the range 200-299
          return true;
        } else {
          // Handle non-successful response
          return false;
        }
      } catch (error) {
        // Handle network errors or exceptions
        return false;
      }
    };

    // console.log("---------",await fetchData());
    return await fetchData()

  }



};


