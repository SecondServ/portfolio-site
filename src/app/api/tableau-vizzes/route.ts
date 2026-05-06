import { NextRequest } from 'next/server';

interface TableauViz {
  workbookRepoUrl: string;
  title: string;
  defaultViewName: string;
  viewCount: number;
  numberOfFavorites: number;
  defaultViewRepoUrl: string;
  authorDisplayName: string;
  authorProfileName: string;
}

interface TableauApiResponse {
  current: number;
  next: number | null;
  contents: TableauViz[];
}

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get('username');
  if (!username) {
    return Response.json({ error: 'username required' }, { status: 400 });
  }

  const url =
    `https://public.tableau.com/public/apis/workbooks` +
    `?profileName=${encodeURIComponent(username)}&start=0&count=50&visibility=NON_HIDDEN`;

  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return Response.json(
        { error: `Tableau API returned ${res.status}` },
        { status: 502 },
      );
    }

    const data: TableauApiResponse = await res.json();
    return Response.json(data.contents ?? []);
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 502 });
  }
}
