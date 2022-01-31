using System.Collections.Generic;
using System.Threading.Tasks;

namespace BoatApp.Api.Services
{
    public interface IService<T,I>
    {
        Task<IEnumerable<T>> Get();
        Task<T> Get(I id);
        Task<T> Create(T data);
        Task<bool> Update(T data);
        Task<bool> Delete(T data);
        Task<bool> Delete(I id);

    }
}