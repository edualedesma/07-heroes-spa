import { AuthProvider } from "./auth";
import { AppRouter } from "./routes/AppRouter";


export const HeroesApp = () => {
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    )
}
