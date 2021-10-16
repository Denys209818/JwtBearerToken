using JwtBearerAuthorization.Constants;
using JwtBearerAuthorization.Data.Identity;
using JwtBearerAuthorization.Models;
using JwtBearerAuthorization.Services.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace JwtBearerAuthorization.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private UserManager<AppUser> _userManager { get; set; }
        private SignInManager<AppUser> _signInManager { get; set; }
        private IJwtTokenService _tokenService { get; set; }

        public AccountController(UserManager<AppUser> userManager, 
            SignInManager<AppUser> signInManager, IJwtTokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model) 
        {
            return await Task.Run(() => {
                IActionResult res = null;

                var user = _userManager.FindByEmailAsync(model.Email).Result;
                if (user != null)
                {
                    if (_userManager.CheckPasswordAsync(user, model.Password).Result)
                    {
                        var signRes= _signInManager.PasswordSignInAsync(user, model.Password, false, false).Result;
                        res = Ok(new
                        {
                            Name = user.Firstname,
                            Token = _tokenService.CreateToken(user),
                            Email = user.Email
                        });
                    }
                    else
                    {
                        res = BadRequest(new
                        {
                            Error = "Пароль не вірний!"
                        });
                    }
                }
                else 
                {
                    res = BadRequest(new
                    {
                        Error = "Логін не вірний!"
                    });
                }
                
                return res;
            });
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromForm] RegisterViewModel model)
        {
            IActionResult res = null;
            return await Task.Run(() => {
                AppUser user = new AppUser();

                if (_userManager.FindByEmailAsync(model.Email).Result == null)
                {
                    if (model.Image != null)
                    {
                        string randomFilename = Path.GetRandomFileName() +
                            Path.GetExtension(model.Image.FileName);

                        string dirPath = Path.Combine(Directory.GetCurrentDirectory(), "Images");
                        string fileName = Path.Combine(dirPath, randomFilename);
                        using (var file = System.IO.File.Create(fileName))
                        {
                            model.Image.CopyTo(file);
                        }
                        user.Image = randomFilename;
                    }
                    user.Firstname = model.Firstname;
                    user.Lastname = model.Lastname;
                    user.PhoneOwn = model.Phone;
                    user.Email = model.Email;
                    user.UserName = model.Email;

                    var result = _userManager.CreateAsync(user, model.Password).Result;
                    if (result.Succeeded)
                    {
                        var r=_userManager.AddToRoleAsync(user, Roles.USER).Result;
                        var resultLogin =_signInManager.PasswordSignInAsync(user, 
                            model.Password,false, false).Result;
                        res = Ok(new
                        {
                            Name = user.Firstname,
                            Token = _tokenService.CreateToken(user),
                            Email = user.Email
                        });
                    }
                    else
                    {
                        res = BadRequest(new
                        {
                            error = "Помилка реєстрації!"
                        });
                    }

                }
                else 
                {
                    res = BadRequest(new
                    {
                        error = "Користувач уже зареєстрований!"
                    });
                }
                return res;
            });
        }
        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> Logout([FromBody] LogoutViewModel model)
        {
            return await Task.Run(() => {
                var userClaim = _signInManager.IsSignedIn(_signInManager.CreateUserPrincipalAsync(
                    _userManager.FindByEmailAsync(model.Email).Result).Result);
                if (userClaim)
                {
                    _signInManager.SignOutAsync().Wait();
                }
                return Ok();
            });
        }
        [HttpPost]
        [Route("get")]
        [Authorize(Roles = Roles.USER)]
        public async Task<IActionResult> GetUsers() 
        {
            return await Task.Run(() => {
                return Ok(_userManager.Users
                    .Select(x => x).ToList());
            });
        }
    }
}
