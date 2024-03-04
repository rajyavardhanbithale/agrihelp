import smtplib
import ssl
from email.message import EmailMessage
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()

SENDER = os.environ.get("SENDER")
PASSWORD = os.environ.get("PASSWORD")
PREHEAD = os.environ.get("PREHEAD")
TITLE = os.environ.get("TITLE")
SUBJECT = os.environ.get("SUBJECT")
SERVER = os.environ.get("SERVER")
PORT = os.environ.get("PORT")
HOST = os.environ.get("HOST")




def sendMail(receiver,verification_url):
 
        
    html_content = """
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Email Confirmation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!--[if mso]>
        <style type="text/css">
            /* Styles for Outlook go here */
        </style>
        <![endif]-->
        <style>
            body {{
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }}

            .container {{
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }}

            .a__button {{
                display: inline-block;
                padding: 15px 30px;
                background-color: #181c25;
                color: #ffffff !important;
                text-decoration: none;
                border-radius: 25px;
                transition: background-color 0.3s ease;
                margin-bottom: 5px;
            }}

            .a__button:hover {{
                background-color: #2c323f;
            }}
        </style>
    </head>

    <body>
        <!--[if mso]>
        <table role="presentation" width="600" style="margin: 0 auto;">
            <tr>
                <td style="padding: 20px; text-align: center;">
        <![endif]-->
        <div class="container" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <header style="background-color: #181c25; padding: 25px; text-align: center; border-top-left-radius: 10px; border-top-right-radius: 10px; color: #ffffff;">
                <img src="https://avatars.githubusercontent.com/u/111894511?v=4" alt="Logo" style="width: 64px; height: 64px; border-radius: 25%; max-width: 100%;">
            </header>

            <div class="content" style="padding: 25px;">
                <h1 style="font-size: 28px; font-weight: bold; color: #333333; margin-top: 5px;">Confirm Your Email Address</h1>
                <p style="font-size: 16px; line-height: 1.5; color: #666666;">Tap the button below to confirm your email address. If you didn't create an account with <a href="{site_url}" style="color: #1a82e2; text-decoration: none;">{site_name}</a>, you can safely delete this email.</p>

                <a href="{verification}" class="cta-button a__button" style="display: inline-block; padding: 15px 30px; background-color: #181c25; color: #ffffff !important; text-decoration: none; border-radius: 25px; transition: background-color 0.3s ease; margin-bottom: 5px;">Verify Me !!</a>

                <p style="font-size: 16px; line-height: 1.5; color: #666666;">If that doesn't work, copy and paste the following link in your browser:</p>
                <p style="font-size: 16px; line-height: 1.5; color: #666666;"><a href="{verification}" style="color: #1a82e2; text-decoration: none;">{verification}</a></p>
            </div>

            <footer style="text-align: center; padding: 20px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; color: #666666;">
                <p style="font-size: 16px; line-height: 1.5; color: #666666;">You received this email because we received a request for signup for your account. If you didn't request signup, you can safely delete this email.</p>
                <p style="font-size: 16px; line-height: 1.5; color: #666666;">To stop receiving these emails, you can <a href="#" style="color: #1a82e2; text-decoration: none;">unsubscribe</a> at any time.</p>
                <p style="font-size: 16px; line-height: 1.5; color: #666666;">© Rajyavardhan's RAGE {year}</p>
            </footer>
        </div>
        <!--[if mso]>
                </td>
            </tr>
        </table>
        <![endif]-->
    </body>

    </html>


    """.format(head=PREHEAD,site_url=HOST,verification=verification_url,year=datetime.today().year,site_name=TITLE)

    em = EmailMessage()

    em['From'] = SENDER
    em['To'] = receiver
    em['SUBJECT'] = SUBJECT
    em.add_alternative(html_content,subtype='html')
    print("++")
    with smtplib.SMTP_SSL(SERVER,PORT,context=ssl.create_default_context()) as smtp:
        try:
            smtp.login(SENDER, PASSWORD)
            smtp.send_message(em)
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

 
# sendMail(receiver="ramiwick5@gmail.com",verification_url="")