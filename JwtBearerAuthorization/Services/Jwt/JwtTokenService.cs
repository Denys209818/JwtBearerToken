using JwtBearerAuthorization.Data.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace JwtBearerAuthorization.Services.Jwt
{
    public class JwtTokenService : IJwtTokenService
    {
        private UserManager<AppUser> _userManager { get; set; }
        public JwtTokenService(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }
        public string CreateToken(AppUser user)
        {
            List<Claim> claims = new List<Claim> { 
                new Claim("id", user.Id.ToString()),
                new Claim("email", user.Email),
                new Claim("name", user.Firstname)
            };

            var roles = (_userManager.GetRolesAsync(user).Result)
                .OrderBy(x => x).ToList();
            
            foreach (var role in roles)
            {
                claims.Add(new Claim("roles", role));
            }

            var signInKey = new SymmetricSecurityKey(Encoding
                .UTF8.GetBytes("awdaawdawdklawmdawjdnakwdnawdbhawkjdkcjbhabckauc5"));
            var signInCredentials = new SigningCredentials(signInKey, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken (
                signingCredentials: signInCredentials,
                expires: DateTime.Now.AddDays(100),
                claims: claims
            );

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
