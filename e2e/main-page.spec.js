import { test, expect } from '@playwright/test';

test.describe('EgovFrame 메인 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('메인 페이지가 올바르게 로드됨', async ({ page }) => {
    // 페이지 제목 확인
    await expect(page).toHaveTitle(/표준프레임워크 심플홈페이지/);
    
    // 메인 로고 확인
    await expect(page.locator('img[alt*="logo"]')).toBeVisible();
    
    // 주요 네비게이션 메뉴 확인
    await expect(page.getByText('사이트소개')).toBeVisible();
    await expect(page.getByText('정보마당')).toBeVisible();
    await expect(page.getByText('고객지원')).toBeVisible();
    await expect(page.getByText('알림마당')).toBeVisible();
  });

  test('모바일 메뉴 토글 동작', async ({ page }) => {
    // 모바일 뷰포트로 변경
    await page.setViewportSize({ width: 375, height: 667 });
    
    // 모바일 메뉴 버튼 확인 및 클릭
    const menuButton = page.locator('.allmenu_btn');
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    
    // 모바일 메뉴가 열렸는지 확인
    await expect(page.locator('.all_menu.show')).toBeVisible();
  });

  test('네비게이션 메뉴 링크 동작', async ({ page }) => {
    // 사이트소개 메뉴 클릭
    await page.getByText('사이트소개').click();
    
    // URL 변경 확인
    await expect(page).toHaveURL(/\/about/);
  });

  test('공지사항 섹션 표시', async ({ page }) => {
    // 공지사항 제목이 있는지 확인
    await expect(page.locator('text=공지사항')).toBeVisible();
    
    // 더보기 링크 확인
    const moreLink = page.locator('a[href*="/notice"]');
    await expect(moreLink).toBeVisible();
  });

  test('갤러리 섹션 표시', async ({ page }) => {
    // 갤러리 제목이 있는지 확인  
    await expect(page.locator('text=갤러리')).toBeVisible();
    
    // 갤러리 이미지들이 로드되는지 확인
    const galleryImages = page.locator('.gallery img');
    await expect(galleryImages.first()).toBeVisible();
  });

  test('로그인 페이지 이동', async ({ page }) => {
    // 로그인 링크 클릭
    await page.getByText('로그인').click();
    
    // 로그인 페이지로 이동 확인
    await expect(page).toHaveURL(/\/login/);
    
    // 로그인 폼 확인
    await expect(page.locator('input[type="text"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('페이지 접근성 기본 요소 확인', async ({ page }) => {
    // 메인 헤딩 확인
    await expect(page.locator('h1, h2').first()).toBeVisible();
    
    // Skip to content 링크 확인 (있다면)
    const skipLink = page.locator('text=본문 바로가기');
    if (await skipLink.count() > 0) {
      await expect(skipLink).toBeVisible();
    }
    
    // Alt 텍스트가 있는 이미지들 확인
    const images = page.locator('img');
    const imageCount = await images.count();
    if (imageCount > 0) {
      // 최소한 첫 번째 이미지에는 alt 속성이 있어야 함
      await expect(images.first()).toHaveAttribute('alt');
    }
  });
});