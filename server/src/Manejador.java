import Component.*;
import Servisofts.SConsole;
import org.json.JSONObject;
import Server.SSSAbstract.SSSessionAbstract;

public class Manejador {
    public static void onMessage(JSONObject obj, SSSessionAbstract session) {
        if (session != null) {
            SConsole.log(session.getIdSession(), "\t|\t", obj.getString("component"), obj.getString("type"));
        } else {
            SConsole.log("http-server", "-->", obj.getString("component"), obj.getString("type"));
        }
        if (obj.isNull("component")) {
            return;
        }
        switch (obj.getString("component")) {
            case test.COMPONENT:
                test.onMessage(obj, session);
                break;
            case Dato.COMPONENT:
                Dato.onMessage(obj, session);
                break;
            case RolDato.COMPONENT:
                RolDato.onMessage(obj, session);
                break;
            case UsuarioDato.COMPONENT:
                UsuarioDato.onMessage(obj, session);
                break;
            case Banco.COMPONENT:
                Banco.onMessage(obj, session);
                break;
            case BancoCuenta.COMPONENT:
                Banco.onMessage(obj, session);
                break;
            case CuentaMovimiento.COMPONENT:
                Banco.onMessage(obj, session);
                break;
        }
    }
}
