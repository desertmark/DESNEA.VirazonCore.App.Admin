using DESNEA.VirazonCore.App.Entidades.Inferfaces.Configuracion;
using System;
using System.Collections.Generic;
using System.Text;

namespace DESNEA.VirazonCore.App.Entidades.Configuracion
{
    public class GeneralConfig: IGeneralConfig
    {
        public string ConnectionString { get; set; }
        public string ApiUrl { get; set; }
        public string WebUrl { get; set; }

    }
}
