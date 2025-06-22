// src/app/firebase/firebase.ts
import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: 'book-management-website',
    private_key_id: '64a575caddfa0b3e5150b5dc77d60d6d9de9ae23',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9vlgSql2WJYnS\nVXrZn8EAyP5dLvw7I+/flkV7ErnIET5mfLH0gRKP86lkJ0p30GIQr8mbIRxFrPLC\nEJAhfwbomSDDi3sbiTfsE6zmZ61OdVc9asfoKHENq6+B/Eapx1IcWUuqO/YGJeqM\nyH4odfRFPL8w7VSQk2LkeoC+1z4h/tzuIxQDsWgJs/pMQdTqzGXjxnWA9fNAwku/\nO5oh5Xx8NQVjM02iRQnVqvEnRrueQXLAfatpIO80BViqaZygijfU699foifomOy5\nXJXEbd9+Zbh8hJTBv6fkiAz5TfzHL1yl12I/AgdLofF3lQtEMdzrlE7hdtZcMTHO\nhvOL74UNAgMBAAECggEAHIcpW8kUoBYNxjuG6IB99r3BjMYbM1MgZigEU1BJ8Xwy\nOxuFcAMWBOG4NrA3oJMKo4Kil7nfM9SgfTAbU4XzRnZ7eBsZC9dSOqLsrImrA3Be\nCQRsgQnPkaQeE7eX8j/fJxb/6tzwDRWXUcp1OWUesGhFQLh2LfSS+lI22Dqpg1e5\nh4VxgooSGyT0DrGpaqLI1lwJZTFHQoerfye4ltow4aaHzP53xmvmeWal3r55lcFc\nxLvpbzbmpXIeHorJl3hhdHiKI02hRaquqyXeqwXEQkuKw11Je/jogXzSi5VqGnbv\nvwdOpQnVD6iaG5yuOx9/0XzvhHLryxt8u+3mwlTJoQKBgQDoPD31K/IkUtFL+C+v\njxN0HUi54FC/oOT4QC1uTo8BkF8PAi0p7rRjdSiwd+iEo3Be0MkcQmu3yAosRvsy\n5nGHCbXydfSSsjZ/q5PWHfpZQDnDIAh0YnQ3PPaf1j3p7jVPNC7KlPlLvP9WgMyb\nAlFH5jguCFzw7MCRqq5ZDIhlvQKBgQDRKPcB3/R0v0nljzJzMEBryiG3SGXMFW29\nHK/k6Nes+h1LIIvNgChnyCfBUV/KgTPrpqFQ7/U/1Jx47FNZx/iHTn2ntFvfMpEG\nyRp5tpLteajVL8wB/oG20WNp7kjCKvvJqVVpNwFqoLakd6Oqwf6kqV5wwSK5LTVD\nksD7c4dJkQKBgFVdX4DxiG5lqt17+ztTIll6MjNxCv2FjOTb4lc7tUFj6i1AJY3W\nWqR8elpzmRq4YSPZJzOmDqZdd6/S359UKcLzhNf9F8ucin/fd9Yq6s1H2HOrILB3\nSDTNyfHy9Is6ronQqqp4nDKE5G7NpWgNMAd3zorNNCyzOg3RaYj+HF0ZAoGAN7Nu\nHHy00EaE+nJpIA3wigQZeIL6QSBPyjYSjaaIkVNGa9RuBrsjh4fhNnViSj6gQhht\nC23r5STMytM820MK55W6lufMM6N2xdTWjSVW+ZEVqjiBXuKVTsdybyp7C+KAjVLg\nIRX59Zh5K1GFL5tcIiPMt8Bna+MjNSym4hABLlECgYEAjBfU+T0UzlOLJ15Bhkgx\nufrp2y8j7hwl0VAwe0BpnZCiwI1XBTACYRjcUS3FL2n9JpxtfCGF8Vu6H/pWrt0O\n2y6FhyWFebtBVRyatsm1bytyYX/OuJcKAfID6BdgpzFaL2sBanHoFRZ0wgQxGO6/\nT1+LSiO+MaCcENJ6zIbQYnU=\n-----END PRIVATE KEY-----\n',
    client_email:
      'firebase-adminsdk-ela5b@book-management-website.iam.gserviceaccount.com',
    client_id: '111343949094265204863',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ela5b%40book-management-website.iam.gserviceaccount.com',
    universe_domain: 'googleapis.com',
  } as admin.ServiceAccount),
});

export default admin;
