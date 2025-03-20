/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        }
    },
    
    async rewrites() {
        return [
            {
                source: '/api/interaccion/:path*',
                destination: 'http://localhost:5000/:path*', // Proxy to Backend
            },
        ];
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                pg: false,
                pgpass: false,
                'pg-hstore': false
            };
        }
        return config;
    }
};

export default nextConfig;