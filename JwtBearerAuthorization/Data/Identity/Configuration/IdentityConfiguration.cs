﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JwtBearerAuthorization.Data.Identity.Configuration
{
    public class IdentityConfiguration : IEntityTypeConfiguration<AppUserRole>
    {
        public void Configure(EntityTypeBuilder<AppUserRole> builder)
        {
            builder.HasKey(keys => new { keys.RoleId, keys.UserId });

            builder.HasOne(virtualElementFromAppUserRole => virtualElementFromAppUserRole.User)
                .WithMany(virtualCollectionFromAppUser => virtualCollectionFromAppUser.UserRoles)
                .HasForeignKey(intElementWithForeignKeySettings => intElementWithForeignKeySettings.UserId)
                .IsRequired();

            builder.HasOne(virtualElementFromAppUserRole => virtualElementFromAppUserRole.Role)
                .WithMany(virtualCollectionFromAppRole => virtualCollectionFromAppRole.UserRoles)
                .HasForeignKey(intElementWithForeignKeySettings => intElementWithForeignKeySettings.RoleId)
                .IsRequired();
        }
    }
}
