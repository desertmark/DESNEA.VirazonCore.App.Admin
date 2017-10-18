using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using System.Net.Http;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;
using System.Text;
using Microsoft.Extensions.Options;
using DESNEA.VirazonCore.App.Entidades.Configuracion;
using System.ComponentModel.DataAnnotations;

namespace CGP_Compras_App_Web.Controllers
{
    [Route("api/[controller]")]
    public class UsuarioController : Controller
    {
        public IOptions<GeneralConfig> GeneralConfig { get; set; }

        public UsuarioController(IOptions<GeneralConfig> generalConfig)
        {
            GeneralConfig = generalConfig;
        }

        [AllowAnonymous]
        [Route("login")]
        [HttpPost("[action]")]
        public async Task<IActionResult> Login([FromBody]LoginForm model, string returnUrl)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            if (model.User == "Usuario" && model.Password == "123456")
                return Ok();
            return BadRequest("El Usuario o la contraseña no son correctos.");
            #region metodo Original CGP
            /*
        var datosFalse = JsonConvert.SerializeObject(new
        {
            estado = false,
            mensaje = "Datos de ingreso incorrectos. Verifíque por favor.",
            token = string.Empty,
            returnUrl = string.Empty
        },
         Formatting.None);

        using (var httpClient = new HttpClient())
        {

            httpClient.BaseAddress = new Uri($"{GeneralConfig.Value.ApiUrl}");

            httpClient.DefaultRequestHeaders
             .Accept
             .Add(new MediaTypeWithQualityHeaderValue("application/x-www-form-urlencoded"));//ACCEPT header

            var url = string.Format("{0}/connect/token", httpClient.BaseAddress);

            var uri = new Uri(url);
            var username = user.IdentificacionTributariaTipoId.ToString() + user.cuit.Replace("-", "").Replace(".", "").Replace("/", "");
            var data = new StringContent(string.Format("grant_type=password&username={0}&password={1}&client_id=cgp-compras-app-web&client_secret=masvalepajaroenmanoquecienvolando", username, user.password),
                 Encoding.UTF8,
                "application/x-www-form-urlencoded");

            //ErrorHelper.Log("LogInService: PostAsync");

            var response = await httpClient.PostAsync(uri, data);

            //ErrorHelper.Log("LogInService: PostAsync Response");
            //ErrorHelper.Log("LogInService: PostAsync IsSuccessStatusCode:" + response.IsSuccessStatusCode);

            if (response.IsSuccessStatusCode)
            {
                var tokenResponse = await response.Content.ReadAsStringAsync();


                //ErrorHelper.Log("LogInService: tokenResponse:" + tokenResponse);

                var json = JObject.Parse(tokenResponse);

                var token = json["access_token"].ToString();
                var tokenType = json["token_type"].ToString();
                var tokenExpiresIn = json["expires_in"]; //TimeSpan de expiracion. 

                var datos = Newtonsoft.Json.JsonConvert.SerializeObject(new
                {
                    estado = true,
                    mensaje = string.Empty,
                    token = token,
                    tokenType = tokenType,
                    tokenExpiresIn = tokenExpiresIn,
                    // tokenExpireAt = DateTime.UtcNow.Add(TimeSpan.FromTicks(tokenExpiresIn)),
                    returnUrl = string.IsNullOrEmpty(returnUrl) ? "/" : returnUrl
                },
                Newtonsoft.Json.Formatting.None);

                return Ok(datos);

            }
            else
            {
                //ErrorHelper.Log("LogInService: If IsSuccessStatusCode No");
                return BadRequest(datosFalse);
            }
        }
        //ErrorHelper.Log("LogInService: Using var httpClient = new HttpClient()");
        */
            #endregion
        }


        [AllowAnonymous]
        [Route("inicializar")]
        [HttpPost("[action]")]
        public IActionResult InicializarContrasenia([FromBody]ResetPasswordModel user)
        {

            if (ModelState.IsValid)
            {
                return Ok(user);
            }

            ModelState.AddModelError("", "Hubo un error al procesar la solicitud. Consulte con Mesa de Ayuda");
            return BadRequest("Hubo un error al procesar la solicitud. Consulte con Mesa de Ayuda");


            //return View("ResetPasswordChange", model2);
        }

        [HttpPost("[action]")]
        public IActionResult ResetPasswordRequest([FromBody]ResetPasswordModel model)
        {
            if (model.cuitCuil == "20-33730289-1")
                return BadRequest(new { cuitCuil = "CUIT/CUIL Invalido", email = "Email Invalido", error = new string[] { "Error1", "Error2" } });
            return Ok(model);
        }


    }

    #region models
    public class LoginForm
    {
        [Required]
        public string User { get; set; }
        [Required]
        public string Password { get; set; }
    }
    public class User
    {
        public string cuit { get; set; }
        public int IdentificacionTributariaTipoId { get; set; }
        public string password { get; set; }
        public bool isAuthenticated { get; set; }
        public string name { get; set; }
    }

    public class ResetPasswordModel
    {

        //public string NombreUsuarioCompleto { get; set; }

        public string password { get; set; }
        public string passwordReingresada { get; set; }
        public string token { get; set; }
        public string cuitCuil { get; set; }
        public string email { get; set; }
        //public bool LimiteTiempoExcedido { get; set; }
    }

    #endregion
}
