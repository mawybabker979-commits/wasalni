/* ==========================================
   ملف التفاعل (JavaScript) - تطبيق وصلني
   ========================================== */

document.addEventListener("DOMContentLoaded", function() {

    // 1. رسالة ترحيبية تفاعلية بناءً على الوقت
    const welcomeElement = document.getElementById("welcome-msg");
    if (welcomeElement) {
        const currentHour = new Date().getHours();
        let greeting = "أهلاً بك في تطبيق وصلني!";
        
        if (currentHour < 12) {
            greeting = "صباح الخير! ابدأ رحلتك اليوم مع تطبيق وصلني ☀️";
        } else {
            greeting = "مساء الخير! اطلب رحلتك الآمنة الآن مع تطبيق وصلني 🌙";
        }
        
        welcomeElement.textContent = greeting;
    }

    // 2. التفاعل مع أزرار طلب الرحلات في الخريطة أو الرئيسية
    const rideButtons = document.querySelectorAll("button, .btn");
    rideButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            if (this.textContent.includes("طلب") || this.textContent.includes("رحلة") || this.textContent.includes("تأكيد")) {
                // إذا لم يكن نموذج تسجيل دخول أو تواصل، أظهر تنبيه البحث عن كابتن
                if (!this.closest("form")) {
                    alert("📍 تم استلام طلبك! جاري البحث عن أقرب كابتن متاح لخدمتك في تطبيق وصلني...");
                }
            }
        });
    });

    // 3. تأكيد إرسال نموذج التواصل الخاص بتطبيق وصلني
    const contactForm = document.querySelector("form");
    if (contactForm && window.location.pathname.includes("contact.html")) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const nameInput = document.getElementById("name");
            
            if (nameInput && nameInput.value.trim() !== "") {
                alert("شكراً لكِ يا " + nameInput.value + "! تم إرسال رسالتك بنجاح، وسنتواصل معكِ قريباً عبر فريق دعم تطبيق وصلني.");
            } else {
                alert("تم إرسال رسالتك بنجاح، شكراً لتواصلك مع تطبيق وصلني!");
            }
            contactForm.reset(); // مسح الحقول بعد الإرسال
        });
    }

    // 4. تفعيل تحديد الموقع الجغرافي للخريطة المباشرة
    const mapContainer = document.querySelector(".map-container, div[style*='border']");
    if (mapContainer && (window.location.pathname.includes("map.html") || window.location.pathname.includes("index.html"))) {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    
                    mapContainer.innerHTML = `
                        <div style="color: #fff; text-align: center; padding: 30px;">
                            <p style="font-size: 16px; color: #4CAF50; font-weight: bold; margin-bottom: 10px;">📍 تم تحديد موقعك بنجاح في تطبيق وصلني!</p>
                            <p style="font-size: 14px; color: #ddd;">خط العرض: ${lat.toFixed(4)}</p>
                            <p style="font-size: 14px; color: #ddd;">خط الطول: ${lon.toFixed(4)}</p>
                            <p style="font-size: 13px; color: #00bcd4; margin-top: 15px;">الكابتن الأقرب في طريقه إليك الآن...</p>
                        </div>
                    `;
                },
                function(error) {
                    mapContainer.innerHTML = `
                        <div style="color: #ff6b6b; text-align: center; padding: 30px;">
                            <p style="font-size: 15px; font-weight: bold;">⚠️ تعذر الوصول إلى موقعك الجغرافي</p>
                            <p style="font-size: 13px; margin-top: 8px;">الرجاء السماح للمتصفح بالوصول للموقع لتتمكن خريطة وصلني من إيجاد أقرب كابتن.</p>
                        </div>
                    `;
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        }
    }

});
