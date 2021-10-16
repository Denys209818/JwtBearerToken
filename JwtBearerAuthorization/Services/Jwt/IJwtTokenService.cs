using JwtBearerAuthorization.Data.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JwtBearerAuthorization.Services.Jwt
{
    public interface IJwtTokenService
    {
        public string CreateToken(AppUser user);
    }
}
