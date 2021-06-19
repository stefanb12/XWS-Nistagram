using ProfileMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserMicroservice.Repository;

namespace UserMicroservice.Service
{
    public class RegistrationRequestService : IRegistrationRequestService
    {
        private IRegistrationRequestRepository _registrationRequestRepository;

        public RegistrationRequestService(IRegistrationRequestRepository registrationRequestRepository)
        {
            _registrationRequestRepository = registrationRequestRepository;
        }

        public async Task<RegistrationRequest> GetById(int id)
        {
            return await _registrationRequestRepository.GetById(id);
        }

        public async Task<IEnumerable<RegistrationRequest>> GetAll()
        {
            return await _registrationRequestRepository.GetAll();
        }

        public async Task<RegistrationRequest> Insert(RegistrationRequest entity)
        {
            return await _registrationRequestRepository.Insert(entity);
        }

        public async Task<RegistrationRequest> Update(RegistrationRequest entity)
        {
            await _registrationRequestRepository.Update(entity);
            return entity;
        }

        public async Task Delete(RegistrationRequest entity)
        {
            await _registrationRequestRepository.Delete(entity);
        }
    }
}
