import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EgovPaging from '@/components/EgovPaging';

describe('EgovPaging Component', () => {
  const defaultProps = {
    pagination: {
      currentPageNo: 1,
      totalRecordCount: 100,
      recordCountPerPage: 10,
      pageSize: 10
    },
    moveToPage: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders pagination when props are provided', () => {
    render(<EgovPaging {...defaultProps} />);
    
    // 페이징이 렌더링되는지 확인 (빈 태그가 아닌지)
    const pagingContainer = document.querySelector('.paging');
    expect(pagingContainer).toBeInTheDocument();
    expect(pagingContainer?.textContent).not.toBe('-');
  });

  it('shows dash when pagination is undefined', () => {
    const emptyProps = {
      pagination: undefined,
      moveToPage: vi.fn()
    };
    
    render(<EgovPaging {...emptyProps} />);
    
    const pagingContainer = document.querySelector('.paging');
    expect(pagingContainer?.textContent).toContain('-');
  });

  it('renders first/previous buttons when total pages exceed pageSize', () => {
    const manyPagesProps = {
      pagination: {
        currentPageNo: 5,
        totalRecordCount: 200, // 20 pages total
        recordCountPerPage: 10,
        pageSize: 10
      },
      moveToPage: vi.fn()
    };
    
    render(<EgovPaging {...manyPagesProps} />);
    
    // 처음 버튼 확인
    expect(screen.getByText('처음')).toBeInTheDocument();
    
    // 이전 버튼 확인  
    expect(screen.getByText('이전')).toBeInTheDocument();
  });

  it('calls moveToPage when first button is clicked', () => {
    const manyPagesProps = {
      pagination: {
        currentPageNo: 5,
        totalRecordCount: 200,
        recordCountPerPage: 10,
        pageSize: 10
      },
      moveToPage: vi.fn()
    };
    
    render(<EgovPaging {...manyPagesProps} />);
    
    const firstButton = screen.getByText('처음');
    fireEvent.click(firstButton);
    
    expect(manyPagesProps.moveToPage).toHaveBeenCalledWith(1);
  });

  it('calls moveToPage when previous button is clicked', () => {
    const manyPagesProps = {
      pagination: {
        currentPageNo: 5,
        totalRecordCount: 200,
        recordCountPerPage: 10,
        pageSize: 10
      },
      moveToPage: vi.fn()
    };
    
    render(<EgovPaging {...manyPagesProps} />);
    
    const prevButton = screen.getByText('이전');
    fireEvent.click(prevButton);
    
    expect(manyPagesProps.moveToPage).toHaveBeenCalledWith(4); // currentPageNo - 1
  });

  it('handles edge case when on first page', () => {
    const firstPageProps = {
      pagination: {
        currentPageNo: 1,
        totalRecordCount: 200,
        recordCountPerPage: 10,
        pageSize: 10
      },
      moveToPage: vi.fn()
    };
    
    render(<EgovPaging {...firstPageProps} />);
    
    const prevButton = screen.getByText('이전');
    fireEvent.click(prevButton);
    
    // 첫 페이지에서 이전 클릭 시 1페이지로 이동
    expect(firstPageProps.moveToPage).toHaveBeenCalledWith(1);
  });

  it('calculates total pages correctly', () => {
    const props = {
      pagination: {
        currentPageNo: 1,
        totalRecordCount: 25, // 3 pages total (25 items, 10 per page)
        recordCountPerPage: 10,
        pageSize: 5
      },
      moveToPage: vi.fn()
    };
    
    render(<EgovPaging {...props} />);
    
    // 페이지가 적을 때는 처음/이전 버튼이 없어야 함
    expect(screen.queryByText('처음')).not.toBeInTheDocument();
    expect(screen.queryByText('이전')).not.toBeInTheDocument();
  });

  it('handles empty total record count', () => {
    const emptyProps = {
      pagination: {
        currentPageNo: 1,
        totalRecordCount: 0,
        recordCountPerPage: 10,
        pageSize: 10
      },
      moveToPage: vi.fn()
    };
    
    expect(() => {
      render(<EgovPaging {...emptyProps} />);
    }).not.toThrow();
  });

  it('logs props to console', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    render(<EgovPaging {...defaultProps} />);
    
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });
});