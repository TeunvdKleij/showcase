using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using ServerShowcase.Model;
using System.Net.Http.Json;
using System.Runtime.Intrinsics.X86;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading;

namespace ServerShowcase.Controllers
{
    public class CaptchaController : Controller
    {
        public static string ValidateCaptcha(string encodedResponse)
        {
            System.Net.WebClient client = new System.Net.WebClient();
            string privateKey = "6LfpfHkpAAAAACm-m2VHJjEfbz9wg7x6CzybvgJ-";
            var googleReply = client.DownloadString(string.Format("https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}", privateKey, encodedResponse));
            var captchaResponse = JsonConvert.DeserializeObject<CaptchaController>(googleReply);
            return captchaResponse.Success.ToLower();
        }
        [JsonProperty("success")]
        public string Success
        {
            get { return m_Success; }
            set { m_Success = value; }
        }

        private string m_Success;
        [JsonProperty("error-codes")]
        public List<string> ErrorCodes
        {
            get { return m_ErrorCodes; }
            set { m_ErrorCodes = value; }
        }
        private List<string> m_ErrorCodes;
    }
}