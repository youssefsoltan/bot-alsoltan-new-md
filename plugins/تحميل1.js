import os
import instaloader
from flask import Flask, request, send_from_directory
from twilio.twiml.messaging_response import MessagingResponse
from twilio.rest import Client

app = Flask(__name__)

# إعداد متغيرات البيئة لتخزين معلومات تسجيل الدخول و Twilio
INSTAGRAM_USERNAME = os.getenv('INSTAGRAM_USERNAME')
INSTAGRAM_PASSWORD = os.getenv('INSTAGRAM_PASSWORD')
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

def download_instagram_video_by_url(video_url):
    L = instaloader.Instaloader()
    try:
        post = instaloader.Post.from_shortcode(L.context, instaloader.Post.get_shortcode_from_url(video_url))
        L.download_post(post, target="downloaded_videos")
        video_file = f"downloaded_videos/{post.shortcode}.mp4"
        return video_file
    except Exception as e:
        return str(e)

@app.route("/whatsapp", methods=['POST'])
def whatsapp_reply():
    msg = request.form.get('Body')
    from_number = request.form.get('From')
    
    if msg.startswith("تحميل "):
        video_url = msg.split(" ")[1]
        response_message = "يتم تنزيل الفيديو من الرابط..."
        
        video_file = download_instagram_video_by_url(video_url)
        
        if os.path.exists(video_file):
            # إرسال الفيديو إلى المستخدم عبر واتساب
            message = client.messages.create(
                body="هنا الفيديو الذي طلبته:",
                from_=f'whatsapp:{TWILIO_PHONE_NUMBER}',
                to=from_number,
                media_url=[f"http://your_server_address/downloaded_videos/{os.path.basename(video_file)}"]
            )
            response_message = "تم تنزيل الفيديو وإرساله بنجاح!"
        else:
            response_message = f"حدث خطأ أثناء تنزيل الفيديو: {video_file}"
    else:
        response_message = "أرسل 'تحميل [رابط الفيديو]' لتنزيل فيديو من Instagram."

    resp = MessagingResponse()
    resp.message(response_message)
    return str(resp)

@app.route('/downloaded_videos/<path:filename>', methods=['GET'])
def serve_video(filename):
    return send_from_directory('downloaded_videos', filename)

if __name__ == "__main__":
    if not os.path.exists('downloaded_videos'):
        os.makedirs('downloaded_videos')
    app.run(port=5000)
