import Head from "next/head";
import { Layout } from "antd";
import User from "../components/User";

export default function UserPage() {
    return (
        <Layout>
            <Head>
                <title>Informations utilisateur</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <User />
        </Layout>
    );
}