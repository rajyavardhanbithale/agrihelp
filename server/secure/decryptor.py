from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives.padding import PKCS7
from cryptography.hazmat.primitives.asymmetric import padding
import secrets
import base64



def __getKeyFromString(key_string:str):
    key_hash = hashes.Hash(hashes.SHA256(), backend=default_backend())
    key_hash.update(key_string.encode('utf-8'))
    hashed_key = key_hash.finalize()
    return hashed_key[:32]


def decryptString(key:str, data:str,method:str):
 
    key = __getKeyFromString(key_string=key)
    data = data.replace(f'method={method}',"=")

    data = base64.urlsafe_b64decode(data)
    iv = data[:16]
    data = data[16:]

    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    decryptor = cipher.decryptor()

    # Decrypt the data
    decrypted_text = decryptor.update(data) + decryptor.finalize()

    # Unpad the decrypted text using PKCS7
    unpadder = PKCS7(128).unpadder()
    plaintext = unpadder.update(decrypted_text) + unpadder.finalize()
    return plaintext.decode('utf-8')
    
    

