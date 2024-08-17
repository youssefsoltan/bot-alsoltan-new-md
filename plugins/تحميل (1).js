import os
import instaloader
from flask import Flask, request
from twilio.twiml.messaging_response import MessagingResponse, Message
from twilio.rest import Client

app = Flask(__name__)

# إعداد متغيرات البيئة لتخزين معلومات تسجيل الدخول و Twilio
INSTAGRAM_USERNAME = os.getenv('INSTAGRAM_USERNAME')
INSTAGRAM_PASSWORD = os.getenv('INSTAGRAM_PASSWORD')
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

def download_instagram_videos(username, password, target_username):
    L = instaloader.Instaloader()
    try:
        L.login(username, password)
    except instaloader.exceptions.BadCredentialsException:
        return "خطأ في تسجيل الدخول. تأكد من صحة اسم المستخدم وكلمة المرور."
    
    try:
        profile = instaloader.Profile.from_username(L.context, target_username)
        videos = []
        for post in profile.get_posts():
            if post.is_video:
                L.download_post(post, target=f"{target_username}_videos")
                videos.append(post)
        return videos
    except Exception as e:
        return f"حدث خطأ أثناء تنزيل الحساب: {e}"

@app.route("/whatsapp", methods=['POST'])
def whatsapp_reply():
    msg = request.form.get('Body')
    from_number = request.form.get('From')
    
    if msg.startswith("تحميل "):
        target_username = msg.split(" ")[1]
        username = INSTAGRAM_USERNAME
        password = INSTAGRAM_PASSWORD
        
        response_message = f"يتم تنزيل محتويات حساب {target_username}..."
        videos = download_instagram_videos(username, password, target_username)
        
        if isinstance(videos, str):  # في حالة حدوث خطأ
            response_message = videos
        else:
            response_message = f"تم تنزيل محتويات حساب {target_username} بنجاح!"
            # إرسال الفيديوهات إلى المستخدم عبر واتساب
            for video in videos:
                video_file = f"{target_username}_videos/{video.shortcode}.mp4"
                if os.path.exists(video_file):
                    message = client.messages.create(
                        body=f"فيديو من حساب {target_username}:",
                        from_=f'whatsapp:{TWILIO_PHONE_NUMBER}',
                        to=from_number,
                        media_url=[f"http://your_server_address/{video_file}"]
                    )
    else:
        response_message = "أرسل 'تحميل [اسم المستخدم]' لتنزيل محتويات حساب Instagram."

    resp = MessagingResponse()
    resp.message(response_message)
    return str(resp)

if __name__ == "__main__":
    app.run(port=5000)
