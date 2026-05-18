export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface Section extends CosmicObject {
  type: 'sections';
  metadata: {
    name?: string;
    description?: string;
    icon?: string;
    display_order?: number;
  };
}

export interface Version extends CosmicObject {
  type: 'versions';
  metadata: {
    version_number?: string;
    release_date?: string;
    status?: string;
    release_notes?: string;
  };
}

export interface CodeSample {
  language?: string;
  code?: string;
  title?: string;
  description?: string;
}

export interface Article extends CosmicObject {
  type: 'articles';
  metadata: {
    title?: string;
    content?: string;
    section?: Section;
    version?: Version;
    code_samples?: CodeSample[];
    display_order?: number;
  };
}

export interface ChangelogEntry extends CosmicObject {
  type: 'changelog-entries';
  metadata: {
    title?: string;
    date?: string;
    change_type?: string;
    version?: Version;
    description?: string;
  };
}

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}