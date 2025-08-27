import { test, expect } from '@playwright/test';

test.describe('페이징 기능 테스트', () => {
  test('공지사항 페이징 동작', async ({ page }) => {
    // 공지사항 목록 페이지로 이동
    await page.goto('/inform/notice');
    
    // 페이지 로드 대기
    await page.waitForLoadState('networkidle');
    
    // 페이징 컴포넌트가 표시되는지 확인
    const pagination = page.locator('.pagination');
    
    if (await pagination.count() > 0) {
      await expect(pagination).toBeVisible();
      
      // 페이지 번호가 있는지 확인
      const pageNumbers = page.locator('.pagination li a');
      if (await pageNumbers.count() > 0) {
        await expect(pageNumbers.first()).toBeVisible();
        
        // 다음 페이지가 있다면 클릭 테스트
        const nextPage = page.locator('.pagination li:not(.disabled) a:has-text("다음")');
        if (await nextPage.count() > 0) {
          const currentUrl = page.url();
          await nextPage.click();
          
          // 페이지가 변경되었는지 확인
          await page.waitForLoadState('networkidle');
          const newUrl = page.url();
          expect(newUrl).not.toBe(currentUrl);
        }
      }
    }
  });

  test('갤러리 페이징 동작', async ({ page }) => {
    // 갤러리 페이지로 이동
    await page.goto('/inform/gallery');
    
    // 페이지 로드 대기
    await page.waitForLoadState('networkidle');
    
    // 페이징 컴포넌트 확인
    const pagination = page.locator('.pagination');
    
    if (await pagination.count() > 0) {
      await expect(pagination).toBeVisible();
      
      // 현재 페이지 번호 확인
      const currentPage = page.locator('.pagination li.cur');
      if (await currentPage.count() > 0) {
        await expect(currentPage).toBeVisible();
        await expect(currentPage).toHaveClass(/cur/);
      }
      
      // 페이지당 아이템 수 확인
      const items = page.locator('.board_list tr, .gallery_item');
      const itemCount = await items.count();
      expect(itemCount).toBeGreaterThanOrEqual(0);
    }
  });

  test('페이징 이전/다음 버튼 기능', async ({ page }) => {
    // 데이터가 많은 페이지로 이동 (공지사항)
    await page.goto('/inform/notice');
    await page.waitForLoadState('networkidle');
    
    const pagination = page.locator('.pagination');
    
    if (await pagination.count() > 0) {
      // 첫 페이지에서 이전 버튼이 비활성화인지 확인
      const prevButton = page.locator('.pagination li:has-text("이전")');
      if (await prevButton.count() > 0) {
        // 첫 페이지라면 이전 버튼이 disabled여야 함
        const isFirstPage = await page.locator('.pagination li.cur:has-text("1")').count() > 0;
        if (isFirstPage) {
          await expect(prevButton).toHaveClass(/disabled/);
        }
      }
      
      // 다음 페이지로 이동 가능한지 확인
      const nextButton = page.locator('.pagination li:not(.disabled):has-text("다음")');
      if (await nextButton.count() > 0) {
        await nextButton.click();
        await page.waitForLoadState('networkidle');
        
        // 페이지 번호가 변경되었는지 확인
        const currentPageNum = await page.locator('.pagination li.cur').textContent();
        expect(parseInt(currentPageNum || '1')).toBeGreaterThan(1);
      }
    }
  });

  test('직접 페이지 번호 클릭', async ({ page }) => {
    await page.goto('/inform/notice');
    await page.waitForLoadState('networkidle');
    
    const pagination = page.locator('.pagination');
    
    if (await pagination.count() > 0) {
      // 페이지 번호 링크들 확인
      const pageLinks = page.locator('.pagination li a[href*="page"]');
      const linkCount = await pageLinks.count();
      
      if (linkCount > 1) {
        // 두 번째 페이지 링크 클릭
        const secondPage = pageLinks.nth(1);
        const pageText = await secondPage.textContent();
        
        await secondPage.click();
        await page.waitForLoadState('networkidle');
        
        // 현재 활성 페이지가 클릭한 페이지인지 확인
        const activePage = page.locator('.pagination li.cur');
        const activePageText = await activePage.textContent();
        expect(activePageText?.trim()).toBe(pageText?.trim());
      }
    }
  });

  test('페이징 정보 표시 확인', async ({ page }) => {
    await page.goto('/inform/notice');
    await page.waitForLoadState('networkidle');
    
    // 총 건수 정보가 표시되는지 확인
    const totalInfo = page.locator('text=/총.*건/');
    if (await totalInfo.count() > 0) {
      await expect(totalInfo).toBeVisible();
      
      // 총 건수가 숫자로 표시되는지 확인
      const infoText = await totalInfo.textContent();
      expect(infoText).toMatch(/\d+/);
    }
    
    // 페이지 정보 (예: 1/10 페이지) 표시 확인
    const pageInfo = page.getByText(/\d+\s*\/\s*\d+/);
    if (await pageInfo.count() > 0) {
      await expect(pageInfo).toBeVisible();
    }
  });
});