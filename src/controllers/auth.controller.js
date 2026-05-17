// 🎮 Controller (HTTP)
// -reçoit req/res
// -appelle le service
// -renvoie réponse

// j'importe le service (logique metier)
//{verification utilisateur, bcrypt, JWT,}
import { loginUser } from "../services/auth.service.js";

// 👉 Son rôle :
// recevoir la requête HTTP
// appeler le service
// renvoyer la réponse
// Le contrôleur ne doit PAS contenir la logique métier.

//async permet d'utiliser await car les opérations DB prennent du temps.
//req contient les données envoyées par le client. (email, password)[accessible vie req.body]
//res sert à répondre au client.( res.json({ token }) )
//next permet de passer au middleware suivant ou gérer les erreurs.
export const login = async (req, res, next) => {
  //appel du service
  //req.body = décompositions
  // await = attends que loginUser finisse car (DB, bcrypt, JWT) sont asynchrone
  const token = await loginUser(req.body);

  // puis reponse http envoie { "token" : "xxxx"}
  return res.json({ token });
};
