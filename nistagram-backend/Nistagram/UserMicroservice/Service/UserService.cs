﻿using Microsoft.IdentityModel.Tokens;
using ProfileMicroservice.Model;
using ProfileMicroservice.Repository;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ProfileMicroservice.Service
{
    public class UserService : IUserService
    {
        private IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> Authenticate(string username, string password, byte[] secretKey)
        {
            var users = await _userRepository.GetAll();
            Profile user = (Profile)users.ToList().SingleOrDefault(user => user.Username == username && user.Password == password);

            if (user == null)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = secretKey;
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim("UserRole", user.UserRole.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            return user;
        }

        public async Task<User> GetById(int id)
        {
            return await _userRepository.GetById(id);
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await _userRepository.GetAll();
        }

        public async Task<User> Insert(User entity)
        {
            return await _userRepository.Insert(entity);
        }

        public async Task<User> Update(User entity)
        {
            await _userRepository.Update(entity);
            return entity;
        }

        public async Task Delete(User entity)
        {
            await _userRepository.Delete(entity);
        }
    }
}
