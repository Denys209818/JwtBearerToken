using JwtBearerAuthorization.Data.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JwtBearerAuthorization.Services
{
    public static class DbSeeder
    {
        public static void SeedAll(this IApplicationBuilder app) 
        {
            var initRoles = new List<string> { 
            "ADMIN",
            "USER"
            };

            using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope()) 
            {
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<AppRole>>();

                if (!roleManager.Roles.Any()) 
                {
                    foreach (var role in initRoles)
                    {
                        var result = roleManager.CreateAsync(new AppRole { 
                            Name = role
                        }).Result;
                    }
                }
            }
        }
    }
}
