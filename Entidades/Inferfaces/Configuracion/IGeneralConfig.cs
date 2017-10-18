using System;
using System.Collections.Generic;
using System.Text;

namespace DESNEA.VirazonCore.App.Entidades.Inferfaces.Configuracion
{
    public interface IGeneralConfig
    {
        string ConnectionString { get; set; }
        string ApiUrl { get; set; }
        string WebUrl { get; set; }
    }
}
